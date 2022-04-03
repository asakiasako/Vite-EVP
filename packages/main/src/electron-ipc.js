import { ipcMain, app, shell, dialog } from 'electron'
import { getRpcClient } from './rpc'

/**
 * Register listeners for ipcMain
 */
export const registerListeners = function () {
  ipcMain.handle('electron.app.getName', (e) => {
    return app.getName()
  })

  ipcMain.handle('electron.app.getVersion', (e) => {
    return app.getVersion()
  })

  ipcMain.on('electron.shell.openExternal', (e, url) => {
    shell.openExternal(url)
  })

  ipcMain.on('electron.dialog.showErrorBox', (e, title, content) => {
    dialog.showErrorBox(title, content)
  })

  ipcMain.handle('rpcClient.waitForReady', (e, timeout) => {
    return getRpcClient().waitForReady(timeout)
  })

  ipcMain.handle('rpcClient.listApis', (e, timeout) => {
    return getRpcClient().listApis(timeout)
  })

  ipcMain.handle('rpcClient.request', (e, options, timeout) => {
    return getRpcClient().request(options, timeout)
  })
}

/**
 * Removes the specified listener from the listener array for the specified channel
 * @param {string} [channel]
 */
export const removeAllListeners = function (channel) {
  ipcMain.removeAllListeners(channel)
}
