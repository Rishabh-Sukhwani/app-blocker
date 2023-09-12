const listContainer = document.getElementById('selected-list');

const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', async () => {
        window.electronAPI.loadFile('../index.html');
    });


window.electronAPI.readLogs();
const logString = localStorage.getItem("logArray");
//console.log(logString);
const logArray = JSON.parse(logString);


console.log(logArray);


logArray.forEach(element => {

    if (element != "") {

        const listItem = document.createElement('div');
        listItem.textContent = element;
        listItem.className = 'list-item';
        listContainer.appendChild(listItem);

        if (element.includes("INFO")) {
            listItem.classList.add("logs-info");
        } else if (element.includes("WARN")) {
            listItem.classList.add("logs-warn");
        } else if (element.includes("DEBUG")) {
            listItem.classList.add("logs-debug");
        } else if (element.includes("ERROR")) {
            listItem.classList.add("logs-error");
        }

        
    }

    
});