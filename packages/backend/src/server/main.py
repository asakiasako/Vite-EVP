"""
RPC server to expose APIs.

Please define your apis in `/src/backend/backend/apis/` follow the examples. 
It is also supported to register api dynamically after the server is started.
"""

import grpc
import msgpack
from concurrent import futures

from . import rpc_pb2
from . import rpc_pb2_grpc
from apis import ApiRouter

MAX_MESSAGE_LENGTH = 10*1024*1024  # grpc default is 4M, extend to 10M

class RPCServicer(rpc_pb2_grpc.ServiceRPCServicer):

    __router = ApiRouter()

    def request(self, request, context):
        try:
            route = request.route
            argData = msgpack.unpackb(request.argData)
            args = argData['args']
            kwargs = argData['kwargs']
            reply = self.__router.invoke_api(route, args=args or [], kwargs=kwargs or {})
            bytesReply = msgpack.packb(reply)
        except Exception as e:
            err_msg = type(e).__name__
            if e.args:
                err_msg += ': {desc}'.format(desc=e.args[0])
            context.abort(grpc.StatusCode.UNKNOWN, err_msg)
        return rpc_pb2.ApiResponse(replyData=bytesReply)

    def listApis(self, request, context):
        try:
            routes = self.__router.list_apis()
        except Exception as e:
            err_msg = type(e).__name__
            if e.args:
                err_msg += ': {desc}'.format(desc=e.args[0])
            context.abort(grpc.StatusCode.UNKNOWN, err_msg)
        return rpc_pb2.RpcRoutesList(rpcRoute=routes)


def start_rpc_server(hostname: str, port: int, max_workers:int = 1, max_message_length:int = MAX_MESSAGE_LENGTH):
    """
    Start rpc server (based on grpc).
    
    Args:
        hostname: Server hostname.
        port: Server port.
        max_workers: Number of threads for worker.
        max_message_length: Set `grpc.max_send_message_length` and `grpc.max_receive_message_length`.
    """
    addr = '{hostname}:{port:d}'.format(hostname=hostname, port=port)
    server = grpc.server(
        futures.ThreadPoolExecutor(max_workers=max_workers), 
        options=[
            ('grpc.max_send_message_length', max_message_length),
            ('grpc.max_receive_message_length', max_message_length),
        ]
    )
    rpc_pb2_grpc.add_ServiceRPCServicer_to_server(
        RPCServicer(), server
    )
    server.add_insecure_port(addr)
    server.start()
    server.wait_for_termination()
