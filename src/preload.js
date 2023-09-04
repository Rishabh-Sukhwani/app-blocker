const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (pageName) => ipcRenderer.invoke('open-file', pageName),
  goBack: () => ipcRenderer.send('go-back')
})