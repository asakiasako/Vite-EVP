import { contextBridge, ipcRenderer } from 'electron'

const rpcClient = {
  waitForReady (timeout) {
    return ipcRenderer.invoke('rpcClient.waitForReady', timeout)
  },
  request (options, timeout) {
    return ipcRenderer.invoke('rpcClient.request', options, timeout)
  },
  listApis (timeout) {
    return ipcRenderer.invoke('rpcClient.listApis', timeout)
  }
}

contextBridge.exposeInMainWorld('rpcClient', rpcClient)
