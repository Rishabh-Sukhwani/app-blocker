const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron')
const path = require('path')

var mainWindow;

async function handleFileLoad () {
  mainWindow.loadFile('index.html');
}

function createWindow () {
  if (!tray) {
    createTray();
  }


  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      //contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}


let tray = null;
function createTray() {
  const icon = path.join(__dirname, '/app.png');
  const trayicon = nativeImage.createFromPath(icon);
  tray = new Tray(trayicon.resize({width: 16}));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

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
  if (process.platform !== 'darwin') {}
})