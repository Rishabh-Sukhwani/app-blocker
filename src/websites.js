const inputField = document.getElementById('search-input');
const addButton = document.getElementById('add-button');
const backButton = document.getElementById('back-button');
const selectedList = document.getElementById('selected-list');

backButton.addEventListener('click', async () => {
    window.electronAPI.loadFile('../index.html');
});

// Function to populate the selectedList with blocked websites
async function populateSelectedList() {
    try {
        const blockedWebsites = await window.electronAPI.readBlockedWebsites();

        // Clear the selectedList before adding new items
        selectedList.innerHTML = '';

        blockedWebsites.forEach(element => {
            const listItem = document.createElement('div');
            listItem.textContent = element;
            listItem.className = 'list-item';

            const deleteButton = document.createElement('a');
            deleteButton.href = '#';
            deleteButton.className = 'delete-button';

            // Create an <i> element with the Bootstrap Icons class for delete
            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'bi bi-trash'; // Replace 'bi-trash' with the appropriate Bootstrap Icons class

            // Add a click event listener to delete the list item
            deleteButton.addEventListener('click', (event) => {
                event.preventDefault();

                // Find the index of the item to remove
                const indexToRemove = blockedWebsites.indexOf(element);

                const websiteToRemove = element;
                //console.log("Here");
                window.electronAPI.deleteBlockedWebsite(websiteToRemove, (err) => {
                    if (err) {
                        console.error('Error:', err);
                    } else {
                        console.log(`Successfully removed ${websiteToRemove}.`);
                    }
                });

                if (indexToRemove !== -1) {
                    // Remove the item from the array
                    blockedWebsites.splice(indexToRemove, 1);

                    // Remove the list item from the DOM
                    listItem.remove();
                }
            });

            // Append the delete icon to the delete button
            deleteButton.appendChild(deleteIcon);

            // Append the delete button to the list item
            listItem.appendChild(deleteButton);

            // Append the list item to the selectedList
            selectedList.appendChild(listItem);

            console.log(blockedWebsites);
        });
    } catch (err) {
        // Handle errors
        console.error(err);
    }
}

// Call the function to populate the selectedList on page load
populateSelectedList();

addButton.addEventListener('click', () => {
    const inputValue = inputField.value;
    const websiteToBlock = inputValue;

    // Add code here to block the website and update the selectedList
    window.electronAPI.addBlockedWebsite(websiteToBlock);

    // After blocking the website, update the selectedList again
    populateSelectedList();

    // Clear the input field
    inputField.value = '';
});
