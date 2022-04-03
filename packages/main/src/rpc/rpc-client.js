/* add rpcClient to Vue.prototype.$rpcClient */
import { encode, decode } from '@msgpack/msgpack'
import { ServiceRPCClient } from './rpc_grpc_pb'
import messages from './rpc_pb'
import { credentials } from '@grpc/grpc-js'
import { isUndefined } from 'lodash'

export class RpcClient {
  /**
   * Create RPC client
   * @param {string} hostname
   * @param {int} port
   * @param {number} timeout
   */
  constructor (hostname, port, timeout) {
    this.hostname = hostname
    this.port = port
    this.timeout = timeout
    this.max_message_length = 1024 * 1024 * 10 // 10M
    this.grpcClient = new ServiceRPCClient(`${hostname}:${port}`, credentials.createInsecure(), {
      'grpc.max_send_message_length': this.max_message_length,
      'grpc.max_receive_message_length': this.max_message_length
    })
  }

  waitForReady (timeout = Infinity) {
    // timeout in milliseconds
    const deadline = Date.now() + timeout
    return new Promise((resolve, reject) => {
      this.grpcClient.waitForReady(deadline, (e) => {
        if (e) {
          reject(e)
        } else {
          resolve()
        }
      })
    })
  }

  listApis (timeout) {
    timeout = isUndefined(timeout) ? this.timeout : timeout
    return new Promise((resolve, reject) => {
      this.grpcClient.listApis(new messages.Empty(), { deadline: Date.now() + timeout }, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response.getRpcrouteList())
        }
      })
    })
  }

  request (requestOptions, timeout) {
    const route = requestOptions.route
    const argData = encode({ args: requestOptions.args, kwargs: requestOptions.kwargs })
    const apiRequest = new messages.ApiRequest([route, argData])
    timeout = isUndefined(timeout) ? this.timeout : timeout
    return new Promise((resolve, reject) => {
      this.grpcClient.request(apiRequest, { deadline: Date.now() + timeout }, (err, response) => {
        if (err) {
          reject(err)
        } else {
          const replyData = decode(response.getReplydata())
          resolve(replyData)
        }
      })
    })
  }
}
