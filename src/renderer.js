const btnHome = document.getElementById('card-dashboard')
const btnDashboard = document.getElementById('card-applications')
const btnApplications = document.getElementById('card-websites')
//const filePathElement = document.getElementById('filePath')

btnHome.addEventListener('click', () => {
    window.electronAPI.loadFile('./second.html')
  
})

btnDashboard.addEventListener('click', () => {
    window.electronAPI.loadFile('./third.html')
})

btnApplications.addEventListener('click', () => {
    window.electronAPI.loadFile('./second.html')
  
})

