const btnDashboard = document.getElementById('card-dashboard');
const btnApplications = document.getElementById('card-applications');
const btnWebsites = document.getElementById('card-websites');
const btnLogs = document.getElementById('card-logs');
//const filePathElement = document.getElementById('filePath')

btnDashboard.addEventListener('click', () => {
    window.electronAPI.loadFile('./dashboard.html');
});

btnApplications.addEventListener('click', () => {
    window.electronAPI.loadFile('./applications.html');
});

btnWebsites.addEventListener('click', () => {
    window.electronAPI.loadFile('./websites.html');
});

btnLogs.addEventListener('click', () => {
    window.electronAPI.loadFile('./logs.html');
})



// const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
//   const selectedOptions = selectedOptionsFromStorage ? JSON.parse(selectedOptionsFromStorage) : [];
//   console.log(selectedOptions);
  

//   setInterval(() => {
//     const currentTime = new Date().toLocaleTimeString();
//     console.log('Current Time:', currentTime);
// }, 5000);