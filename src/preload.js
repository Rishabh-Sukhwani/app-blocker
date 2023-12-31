const { contextBridge, ipcRenderer, Notification } = require('electron');
const { getInstalledApps } = require('get-installed-apps');
const { getOpenWindows } = require('active-win');
const { killApp } = require('./scripts/killApp');
const { showNotification } = require('./scripts/notification');
// const { showNotification } = require('electron-main-notification');
const { background } = require('./scripts/background');
const { blockWebsite, getBlockedWebsites, removeBlockedWebsite } = require('./scripts/blockWebsite');
const { cpuUsageWrapper } = require('./scripts/getCPUinfo');
const { logToLogFile } = require('./scripts/logger');
const { readLog } = require('./scripts/readLog');
const { isValidKey } = require('./scripts/checkKey');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (pageName) => ipcRenderer.invoke('open-file', pageName),
  goBack: () => ipcRenderer.send('go-back'),
  installedApps: async () => await getInstalledApps(),
  getAllOpenWindows: () => getOpenWindows(),
  killMatchedWindows: (matchedWindows) => killApp(matchedWindows),
  showBlockedAppNotification: () => showNotification(),
  addBlockedWebsite: (websiteToBlock) => blockWebsite(websiteToBlock),
  readBlockedWebsites: () => getBlockedWebsites(),
  deleteBlockedWebsite: (websiteToRemove) => removeBlockedWebsite(websiteToRemove),
  getUsageCPU: () => cpuUsageWrapper(),
  logMessage: (logLevel, message, additionalData = {}) => logToLogFile(logLevel, message, additionalData = {}),
  readLogs: () => readLog(),
  isKeyValid: (key) => isValidKey(key)
});
