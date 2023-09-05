const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

var mainWindow;

async function handleFileLoad () {
  mainWindow.loadFile('index.html');
}

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      //contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('open-file', (event, pageName) => {
    // Load the requested HTML file
    const filePath = `./src/${pageName}`;
    mainWindow.loadFile(filePath);
    return filePath;
  });
  ipcMain.on('go-back', () => {
    mainWindow.loadFile('index');
  });
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})