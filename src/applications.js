document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const searchInput = document.getElementById('search-input');
    const addButton = document.getElementById('add-button');
    const selectedList = document.getElementById('selected-list');
    const backButton = document.getElementById('back-button');
  
    let array = [];
    const uniqueSelectedOptions = new Set(); // Create a Set to store unique selected options
  
    backButton.addEventListener('click', async () => {
      window.electronAPI.loadFile('../index.html');
    });
    // Function to load uniqueSelectedOptions from localStorage on initial page load
    function loadSelectedOptionsFromLocalStorage() {
      const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
      if (selectedOptionsFromStorage) {
        uniqueSelectedOptions.clear(); // Clear the current set
        JSON.parse(selectedOptionsFromStorage).forEach(option => {
          uniqueSelectedOptions.add(option);
        });
      }
      console.log(selectedOptionsFromStorage);
      
    }


    function onFirstLoad() {

        uniqueSelectedOptions.forEach(optionText => {
            const listItem = document.createElement('li');
            listItem.textContent = optionText;
      
            // Create a delete button element with Bootstrap Icons
            const deleteButton = document.createElement('a');
            deleteButton.href = '#';
            deleteButton.className = 'delete-button';
      
            // Create an <i> element with the Bootstrap Icons class for delete
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'bi bi-trash'; // Replace 'bi-trash' with the appropriate Bootstrap Icons class
      
            // Add a click event listener to delete the list item
            deleteButton.addEventListener('click', (event) => {
              event.preventDefault();
      
              // Remove the item from the Set
              const itemToRemove = listItem.textContent;
              uniqueSelectedOptions.delete(itemToRemove);
      
              // Update localStorage after deleting an item
              saveSelectedOptionsToLocalStorage();
      
              // Remove the list item from the DOM
              listItem.remove();
            });
      
            // Append the delete icon to the delete button
            deleteButton.appendChild(deleteIcon);
      
            // Append the delete button to the list item
            listItem.appendChild(deleteButton);
      
            // Append the list item to the selected list
            selectedList.appendChild(listItem);
          });


    }
  
    // Function to save uniqueSelectedOptions to localStorage
    function saveSelectedOptionsToLocalStorage() {
      const selectedOptionsArray = Array.from(uniqueSelectedOptions);
      localStorage.setItem('selectedOptions', JSON.stringify(selectedOptionsArray));
  
    }
  
    function updateDropdown() {
      const searchValue = searchInput.value.toLowerCase();
  
      // Clear existing options
      dropdownMenu.innerHTML = '';
  
      // Filter and add options that match the search input
      for (let i = 0; i < array.length; i++) {
        const optionText = array[i].toLowerCase();
        if (optionText.includes(searchValue)) {
          const option = document.createElement("option");
          option.textContent = array[i];
          dropdownMenu.appendChild(option);
        }
      }
    }
  
    searchInput.addEventListener('input', updateDropdown);
  
    addButton.addEventListener('click', () => {
      const selectedOptions = Array.from(dropdownMenu.selectedOptions);
  
      // Add unique selected options to the Set
      selectedOptions.forEach(option => {
        uniqueSelectedOptions.add(option.textContent);
      });
  
      // Update localStorage after adding items
      saveSelectedOptionsToLocalStorage();
  
      // Clear the selected list
      selectedList.innerHTML = '';
  
      // Add unique selected items to the list
      uniqueSelectedOptions.forEach(optionText => {
        const listItem = document.createElement('li');
        listItem.textContent = optionText;
  
        // Create a delete button element with Bootstrap Icons
        const deleteButton = document.createElement('a');
        deleteButton.href = '#';
        deleteButton.className = 'delete-button';
  
        // Create an <i> element with the Bootstrap Icons class for delete
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'bi bi-trash'; // Replace 'bi-trash' with the appropriate Bootstrap Icons class
  
        // Add a click event listener to delete the list item
        deleteButton.addEventListener('click', (event) => {
          event.preventDefault();
  
          // Remove the item from the Set
          const itemToRemove = listItem.textContent;
          uniqueSelectedOptions.delete(itemToRemove);
  
          // Update localStorage after deleting an item
          saveSelectedOptionsToLocalStorage();
  
          // Remove the list item from the DOM
          listItem.remove();
        });
  
        // Append the delete icon to the delete button
        deleteButton.appendChild(deleteIcon);
  
        // Append the delete button to the list item
        listItem.appendChild(deleteButton);
  
        // Append the list item to the selected list
        selectedList.appendChild(listItem);
      });
    });
  
    async function getAllOpenWindowsWrapper(knownArray) {
      try {
        const windows = await window.electronAPI.getAllOpenWindows();
        console.log(windows);
  
        const matchedWindows = [];
  
        for (const window of windows) {
          for (const knownName of knownArray) {
            const knownNameWords = knownName.split(" ");
            if (knownNameWords.some(known => window.title.toLowerCase().includes(known.toLowerCase()))) {
              matchedWindows.push(window);
            }
          }
        }
  
        console.log("matched:");
        console.log(matchedWindows);
  
        if (matchedWindows.length > 0) {
          const NOTIFICATION_TITLE = "App Blocker";
          const NOTIFICATION_BODY = "App(s) has been blocked.";
  
          //new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
        }
  
        //const killed = await window.electronAPI.killMatchedWindows(matchedWindows)
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  
    function checkOpenWindows() {
      if (uniqueSelectedOptions.size > 0) {
        getAllOpenWindowsWrapper(uniqueSelectedOptions);
      } else {
        clearInterval(window.checkInterval); // Stop the interval when there are no more items in uniqueSelectedOptions
      }
    }
  
    // Set an interval to call checkOpenWindows every 10 seconds
    window.checkInterval = setInterval(checkOpenWindows, 10000);
  
    // Load initial app data and load from localStorage
    window.electronAPI.installedApps().then(apps => {
      const displayNames = apps.map(app => app.DisplayName);
      displayNames.sort();
      array = displayNames; // Update the global array
      updateDropdown();
      loadSelectedOptionsFromLocalStorage(); // Load selected options from localStorage
      console.log(uniqueSelectedOptions);
      onFirstLoad();
    });
  
    // Function to initialize everything
    function initialize() {
      loadSelectedOptionsFromLocalStorage();
      // Set an interval to call checkOpenWindows every 10 seconds
      window.checkInterval = setInterval(checkOpenWindows, 10000);
    }
  
    // Call initialize to start the process
    initialize();
  });
  