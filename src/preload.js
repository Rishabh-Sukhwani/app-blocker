const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: () => ipcRenderer.invoke('open-file'),
  goBack: () => ipcRenderer.send('go-back')
})