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

  ipcMain.handle('rpcClient.waitForReady', async (event, timeout) => {
    try {
      return { result: await getRpcClient().waitForReady(timeout) }
    } catch (err) {
      return {
        error: {
          name: err.name,
          message: err.message,
          extra: { ...err }
        }
      }
    }
  })

  ipcMain.handle('rpcClient.listApis', async (event, timeout) => {
    try {
      return { result: await getRpcClient().listApis(timeout) }
    } catch (err) {
      return {
        error: {
          name: err.name,
          message: err.message,
          extra: { ...err }
        }
      }
    }
  })

  ipcMain.handle('rpcClient.request', async (event, options, timeout) => {
    try {
      return { result: await getRpcClient().request(options, timeout) }
    } catch (err) {
      return {
        error: {
          name: err.name,
          message: err.message,
          extra: { ...err }
        }
      }
    }
  })
}

/**
 * Removes the specified listener from the listener array for the specified channel
 * @param {string} [channel]
 */
export const removeAllListeners = function (channel) {
  ipcMain.removeAllListeners(channel)
}
