var os 	= require('os-utils');

function cpuUsageWrapper() {

    var usage;

    os.cpuUsage(function(v){
        console.log( 'CPU Usage (%): ' + v*100 );
        localStorage.setItem('CPUusage', v*100);
        usage = v*100;
    });

    return usage;
}

module.exports = { cpuUsageWrapper };