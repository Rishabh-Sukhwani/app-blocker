const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

var mainWindow;

async function handleFileLoad () {
  mainWindow.loadFile('./src/second.html');
}

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('open-file', handleFileLoad)
  ipcMain.on('go-back', () => {
    mainWindow.loadFile('index.html');
  });
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})