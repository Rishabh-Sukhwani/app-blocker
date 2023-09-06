const btnDashboard = document.getElementById('card-dashboard')
const btnApplications = document.getElementById('card-applications')
const btnWebsites = document.getElementById('card-websites')
//const filePathElement = document.getElementById('filePath')

btnDashboard.addEventListener('click', () => {
    window.electronAPI.loadFile('./applications.html');
});

btnApplications.addEventListener('click', () => {
    window.electronAPI.loadFile('./applications.html');
});

btnWebsites.addEventListener('click', () => {
    window.electronAPI.loadFile('./websites.html');
});

// const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
//   const selectedOptions = selectedOptionsFromStorage ? JSON.parse(selectedOptionsFromStorage) : [];
//   console.log(selectedOptions);
  

//   setInterval(() => {
//     const currentTime = new Date().toLocaleTimeString();
//     console.log('Current Time:', currentTime);
// }, 5000);