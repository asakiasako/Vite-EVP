import { contextBridge, ipcRenderer } from 'electron'

const electronAPI = {
  app: {
    getName () {
      return ipcRenderer.invoke('electron.app.getName')
    },
    getVersion () {
      return ipcRenderer.invoke('electron.app.getVersion')
    }
  },
  shell: {
    openExternal (url) {
      ipcRenderer.send('electron.shell.openExternal', url)
    }
  },
  dialog: {
    showErrorBox (title, content) {
      ipcRenderer.send('electron.dialog.showErrorBox', title, content)
    }
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
