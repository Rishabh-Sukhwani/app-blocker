const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage, ipcRenderer } = require('electron');
const path = require('path');

let mainWindow;
let tray = null;

function handleFileLoad () {
  mainWindow.loadFile('index.html');
}

function createWindow () {
  if (!tray) {
    createTray();
  }

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('src/login.html');
  mainWindow.maximize();
}

function createTray () {
  const icon = path.join(__dirname, '/app.png');
  const trayicon = nativeImage.createFromPath(icon);
  tray = new Tray(trayicon.resize({ width: 16 }));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        createWindow();
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit();
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
  createWindow();
  // Send a message to the background process to start the app-blocking process
  // mainWindow.webContents.send('startBackgroundProcess'); // Use emit instead of send

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    // Add any cleanup or shutdown logic here if needed
    // mainWindow.hide();

  }
});
