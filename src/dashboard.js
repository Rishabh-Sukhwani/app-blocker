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
      console.log(uniqueSelectedOptions);
    }
  
    // Load selected options from local storage
    loadSelectedOptionsFromLocalStorage();
  
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
  
    const chart2 = new CanvasJS.Chart("chartContainer2", {
      title: {
        text: "Opened Apps 2"
      },
      data: [{
        type: "line",
        dataPoints: dps
      }],
    });
  
    let xVal = 0;
  
    // Function to update the chart
    function updateChart(count) {
      count = count || 1;
  
      for (let j = 0; j < count; j++) {
        getAllOpenWindowsWrapper().then(yVal => {
          dps.push({
            x: xVal,
            y: yVal
          });
          if (dps.length > dataLength) {
            dps.shift();
          }
          xVal++;
          chart.render();
          chart2.render();
        }).catch(error => {
          console.error("Error: ", error);
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
  