/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function () {
  const dropdownMenu = document.getElementById('dropdown-menu');
  const searchInput = document.getElementById('search-input');
  const addButton = document.getElementById('add-button');
  const selectedList = document.getElementById('selected-list');
  const backButton = document.getElementById('back-button');
  let attemptsCounter = 0;
  localStorage.setItem('numberOfAttempts', attemptsCounter);

  let array = [];
  const uniqueSelectedOptions = new Set(); // Create a Set to store unique selected options

  backButton.addEventListener('click', async () => {
    window.electronAPI.loadFile('../index.html');
  });

  // Function to load uniqueSelectedOptions from localStorage on initial page load
  function loadSelectedOptionsFromLocalStorage () {
    const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
    if (selectedOptionsFromStorage) {
      uniqueSelectedOptions.clear(); // Clear the current set
      JSON.parse(selectedOptionsFromStorage).forEach(option => {
        uniqueSelectedOptions.add(option);
      });
    }
    window.electronAPI.logMessage('INFO', 'Selected options loaded from localStorage');
  }

  function onFirstLoad () {
    uniqueSelectedOptions.forEach(optionText => {
      const listItem = document.createElement('div');
      listItem.textContent = optionText;
      listItem.className = 'list-item';
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
    window.electronAPI.logMessage('INFO', 'Initial load completed');
  }

  // Function to save uniqueSelectedOptions to localStorage
  function saveSelectedOptionsToLocalStorage () {
    const selectedOptionsArray = Array.from(uniqueSelectedOptions);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptionsArray));
    window.electronAPI.logMessage('INFO', 'Selected options saved to localStorage');
  }

  function updateDropdown () {
    const searchValue = searchInput.value.toLowerCase();

    // Clear existing options
    dropdownMenu.innerHTML = '';

    // Filter and add options that match the search input
    for (let i = 0; i < array.length; i++) {
      const optionText = array[i].toLowerCase();
      if (optionText.includes(searchValue)) {
        const option = document.createElement('option');
        option.textContent = array[i];
        dropdownMenu.appendChild(option);
      }
    }
    window.electronAPI.logMessage('INFO', 'Dropdown menu updated');
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
      const listItem = document.createElement('div');
      listItem.textContent = optionText;
      listItem.className = 'list-item';

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
    window.electronAPI.logMessage('INFO', 'Items added to the selected list');
  });

  async function getAllOpenWindowsWrapper (knownArray) {
    try {
      const windows = await window.electronAPI.getAllOpenWindows();
      window.electronAPI.logMessage('DEBUG', 'List of all open windows:', { windows });

      const matchedWindows = [];

      for (const window of windows) {
        const simplifiedWindowTitle = window.title.replace(/\(X64 en-us\)/gi, '').trim();
        for (const knownName of knownArray) {
          const knownNameWords = knownName.split(' ');
          if (knownNameWords.some(known => simplifiedWindowTitle.toLowerCase().includes(known.toLowerCase()))) {
            matchedWindows.push(window);
            break;
          }
        }
      }

      window.electronAPI.logMessage('INFO', 'Matched windows:', { matchedWindows });

      if (matchedWindows.length > 0) {
        const NOTIFICATION_TITLE = 'App Blocker';
        const NOTIFICATION_BODY = 'App(s) has been blocked.';
        attemptsCounter++;
        localStorage.setItem('numberOfAttempts', attemptsCounter);
        // new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
      }
    } catch (error) {
      console.error('Error: ', error);
      window.electronAPI.logMessage('ERROR', 'Error in getAllOpenWindowsWrapper:', { error });
    }
  }

  function checkOpenWindows () {
    if (uniqueSelectedOptions.size > 0) {
      getAllOpenWindowsWrapper(uniqueSelectedOptions);
    } else {
      clearInterval(window.checkInterval);
    }
  }

  // Set an interval to call checkOpenWindows every 10 seconds
  window.checkInterval = setInterval(checkOpenWindows, 10000);

  // Load initial app data and load from localStorage
  window.electronAPI.installedApps().then(apps => {
    const displayNames = apps.map(app => app.DisplayName);
    displayNames.sort();
    array = displayNames;
    updateDropdown();
    localStorage.setItem('numberOfInstalledApps', displayNames.length);
    loadSelectedOptionsFromLocalStorage();
    window.electronAPI.logMessage('INFO', 'Initial app data loaded');
    onFirstLoad();
  });

  // Function to initialize everything
  function initialize () {
    loadSelectedOptionsFromLocalStorage();
    // Set an interval to call checkOpenWindows every 10 seconds
    window.checkInterval = setInterval(checkOpenWindows, 10000);
  }

  // Call initialize to start the process
  initialize();
});
