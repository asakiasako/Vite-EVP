import { DEFAULT_SERVER_HOSTNAME, DEFAULT_SERVER_PORT, DEFAULT_TIMEOUT } from './config'
import { getAvailablePort } from './get-available-port'
import { RpcServer } from './rpc-server'
import { RpcClient } from './rpc-client'
import { app } from 'electron'

let rpcServer
let rpcClient

export const launchRPC = async () => {
  if (RpcServer.instance && RpcServer.instance.isAlive) {
    throw Error('Another instance of RpcServer is still running. Please close it before create a new one.')
  }
  const hostname = DEFAULT_SERVER_HOSTNAME
  const port = await getAvailablePort(DEFAULT_SERVER_HOSTNAME, DEFAULT_SERVER_PORT)
  const userDataPath = app.getPath('userData')
  const appDataPath = app.getPath('appData')
  const environ = {
    USER_DATA_PATH: userDataPath,
    APP_DATA_PATH: appDataPath,
    PYTHONUNBUFFERED: true
  }
  rpcServer = new RpcServer(hostname, port, environ)
  rpcClient = new RpcClient(hostname, port, DEFAULT_TIMEOUT)
}

export function getRpcClient () {
  return rpcClient
}

export function getRpcServer () {
  return rpcServer
}
