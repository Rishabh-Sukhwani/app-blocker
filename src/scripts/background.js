/*
// Import necessary modules
const { app, ipcMain, BrowserWindow, Notification } = require('electron');
const windows = await window.electronAPI.getAllOpenWindows();
    console.log(windows);

// Function to check and block open windows
async function checkAndBlockOpenWindows(selectedOptions) {
  try {
    const windows = await window.electronAPI.getAllOpenWindows();
    console.log(windows);

    const matchedWindows = [];

    for (const window of windows) {
      const simplifiedWindowTitle = window.title.replace(/\(X64 en-us\)/gi, '').trim(); // Remove "(X64 en-us)" and trim spaces
      for (const knownName of selectedOptions) {
        const knownNameWords = knownName.split(" ");
        if (knownNameWords.some(known => simplifiedWindowTitle.toLowerCase().includes(known.toLowerCase()))) {
          matchedWindows.push(window);
          break; // Break the loop when a match is found for this window
        }
      }
    }

    console.log("matched:");
    console.log(matchedWindows);

    if (matchedWindows.length > 0) {
      const NOTIFICATION_TITLE = "App Blocker";
      const NOTIFICATION_BODY = "App(s) has been blocked.";

      new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
    }

    const killed = await window.electronAPI.killMatchedWindows(matchedWindows);
  } catch (error) {
    console.error("Error: ", error);
  }
}

// Listen for an IPC message to start the background process
ipcMain.on('startBackgroundProcess', () => {
  // Load selected options from localStorage (you may need to adjust this part)
  const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
  const selectedOptions = selectedOptionsFromStorage ? JSON.parse(selectedOptionsFromStorage) : [];

  // Check and block open windows
  checkAndBlockOpenWindows(selectedOptions);

  // Set an interval to periodically check and block open windows
  const interval = setInterval(() => {
    checkAndBlockOpenWindows(selectedOptions);
  }, 10000); // 10 seconds

  // Handle cleanup when the app is closed
  app.on('before-quit', () => {
    clearInterval(interval); // Clear the interval before quitting
  });
});

// Handle errors and other cleanup as needed
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Handle the error gracefully or log it as needed
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the rejection gracefully or log it as needed
});
*/


const background = () => {
  const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
  const selectedOptions = selectedOptionsFromStorage ? JSON.parse(selectedOptionsFromStorage) : [];
  console.log(selectedOptions);
}

module.exports = { background };


