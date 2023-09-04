
const btnSecond = document.getElementById('btn-second')
const btnThird = document.getElementById('btn-third')
const btnFourth = document.getElementById('btn-fourth')
const filePathElement = document.getElementById('filePath')

btnSecond.addEventListener('click', () => {
    window.electronAPI.loadFile('./second.html')
  
})

btnThird.addEventListener('click', () => {
    window.electronAPI.loadFile('./third.html')
})

btnFourth.addEventListener('click', () => {
    window.electronAPI.loadFile('./second.html')
  
})

