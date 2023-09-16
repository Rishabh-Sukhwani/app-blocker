const os = require('os-utils');

function cpuUsageWrapper () {
  let usage;

  os.cpuUsage(function (v) {
    console.log('CPU Usage (%): ' + v * 100);
    // eslint-disable-next-line no-undef
    localStorage.setItem('CPUusage', v * 100);
    usage = v * 100;
  });

  return usage;
}

module.exports = { cpuUsageWrapper };
