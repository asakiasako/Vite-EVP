__version__ = '0.1.0'

def redirect_stdio():
    """
    Redirect stdio to os.devnull. Used when frozen to avoid maxBuffer exceed 
    error when spawned by node.js `child_process.execFile`.
    """
    F_NULL = open(os.devnull, 'w')
    sys.stdout = F_NULL
    sys.stderr = F_NULL

if __name__ == '__main__':
    import sys
    import os
    import multiprocessing
    
    multiprocessing.freeze_support()
    if getattr(sys, 'frozen', False):
        redirect_stdio()
    
    from server import start_rpc_server
    HOSTNAME = os.environ['RPC_SERVER_HOSTNAME']
    PORT = int(os.environ['RPC_SERVER_PORT'])
    start_rpc_server(hostname=HOSTNAME, port=PORT)
