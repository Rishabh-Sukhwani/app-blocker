window.onload = function () {
    // Initialize variables and constants
    const uniqueSelectedOptions = new Set();
    let windows;
    const updateInterval = 10000;
    const dataLength = 10;

    // Function to load selected options from local storage
    function loadSelectedOptionsFromLocalStorage() {
        const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
        if (selectedOptionsFromStorage) {
            uniqueSelectedOptions.clear();
            JSON.parse(selectedOptionsFromStorage).forEach(option => {
                uniqueSelectedOptions.add(option);
            });
        }
        window.electronAPI.logMessage('INFO', `Selected options: ${Array.from(uniqueSelectedOptions).join(', ')}`);
    }

    // Load selected options from local storage
    loadSelectedOptionsFromLocalStorage();

    const numberOfInstalledApps = localStorage.getItem('numberOfInstalledApps');
    window.electronAPI.logMessage('INFO', `Number of installed apps: ${numberOfInstalledApps}`);
    const numberOfInstalledAppsCard = document.getElementById('number-installed-apps-text');
    numberOfInstalledAppsCard.innerText = numberOfInstalledApps;

    const numberofBlockedAppsCard = document.getElementById('number-blocked-apps-text');
    numberofBlockedAppsCard.innerText = uniqueSelectedOptions.size;

    const numberOfAttempts = localStorage.getItem('numberOfAttempts');
    window.electronAPI.logMessage('INFO', `Number of attempts: ${numberOfAttempts}`);
    const numberOfAttemptsCard = document.getElementById('number-attempts-text');
    numberOfAttemptsCard.innerText = numberOfAttempts;

    const numberOfBlockedWebsites = localStorage.getItem('numberOfBlockedWebsites');
    window.electronAPI.logMessage('INFO', `Number blocked websites: ${numberOfBlockedWebsites}`);
    const numberOfBlockedWebsitesCard = document.getElementById('number-blocked-websites-text');
    numberOfBlockedWebsitesCard.innerText = numberOfBlockedWebsites;

    // Function to get the number of open windows
    async function getAllOpenWindowsWrapper() {
        try {
            windows = await window.electronAPI.getAllOpenWindows();
            return windows.length;
        } catch (error) {
            console.error("Error: ", error);
            throw error;
        }
    }

    async function getUsageCPUWrapper() {
        try {
            await window.electronAPI.getUsageCPU();
            usage = localStorage.getItem('CPUusage');
            window.electronAPI.logMessage('INFO', `CPU usage: ${usage}`);
            return usage;
        } catch (error) {
            window.electronAPI.logMessage('ERROR', error);
            throw error;
        }
    }

    // Initialize CanvasJS charts
    const dps = [];
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Opened Apps",
            font: {
                family: "Arial"
            }
        },
        data: [{
            type: "line",
            dataPoints: dps
        }],
    });

    const dps2 = [];
    const chart2 = new CanvasJS.Chart("chartContainer2", {
        title: {
            text: "CPU usage"
        },
        data: [{
            type: "line",
            dataPoints: dps2
        }],
    });

    let xVal = 0;

    // Function to update the chart
    function updateChart(count) {
        count = count || 1;

        for (let j = 0; j < count; j++) {
            getAllOpenWindowsWrapper().then(yVal => {
                getUsageCPUWrapper().then(yVal2 => {
                    window.electronAPI.logMessage('INFO', `yVal2: ${yVal2}`);

                    dps.push({
                        x: xVal,
                        y: yVal
                    });

                    dps2.push({
                        x: xVal,
                        y: parseFloat(yVal2) // Parse yVal2 as a float
                    });

                    xVal++;
                    chart.render();
                    chart2.render();
                }).catch(error => {
                    window.electronAPI.logMessage('ERROR', error);
                });
            });
        }
    }

    // Initial chart update
    updateChart(dataLength);

    // Periodically update the chart
    setInterval(function () {
        updateChart();
    }, updateInterval);

    // Add a click event listener to the back button
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', async () => {
        window.electronAPI.loadFile('../index.html');
    });
}
