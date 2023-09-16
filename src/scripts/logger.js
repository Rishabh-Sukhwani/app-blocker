const fs = require('fs');
const path = require('path');

function logToLogFile (logLevel, message, additionalData = {}) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} [${logLevel}] - ${message}`;

  // Include additional data if provided
  if (Object.keys(additionalData).length > 0) {
    // eslint-disable-next-line no-const-assign
    logMessage += '\nAdditional Data: ' + JSON.stringify(additionalData, null, 2);
  }

  const logFileName = 'app.log'; // Specify the name of your log file here

  // Construct the full path to the log file
  const logFilePath = path.join(__dirname, '../../', logFileName);

  // Append the log message to the log file
  fs.appendFile(logFilePath, logMessage + '\n\n', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = { logToLogFile };
