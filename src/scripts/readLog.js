const fs = require('fs');

// Read the contents of the "app.log" file

function readLog () {
  fs.readFile('app.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Split the log data into an array of lines
    const logArray = data.trim().split('\n');
    // eslint-disable-next-line no-undef
    localStorage.setItem('logArray', JSON.stringify(logArray));
    // Display the log data
  });
}

module.exports = { readLog };
