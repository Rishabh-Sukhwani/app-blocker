const { exec } = require('child_process');
const fs = require('fs').promises;

function blockWebsite(websiteToBlock) {
    // Define the IP address to redirect to (localhost in this case)
    const redirectIp = '127.0.0.1';

    // Command to add an entry to the hosts file
    const command = `echo ${redirectIp} ${websiteToBlock} >> C:\\Windows\\System32\\drivers\\etc\\hosts`;

    // Execute the command to modify the hosts file
    exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error modifying hosts file: ${error}`);
        return;
    }

    if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
    }

    console.log(`Blocked ${websiteToBlock} by redirecting to ${redirectIp}`);
    });
}

async function getBlockedWebsites() {
    // Path to the hosts file (Windows)
    const hostsFilePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

    try {
        // Read the hosts file asynchronously
        const data = await fs.readFile(hostsFilePath, 'utf-8');
        //console.log(data);
        // Split the file content into lines
        const lines = data.split('\n');

        // Extract blocked websites from the hosts file
        const blockedWebsites = [];
        for (const line of lines) {
            // Skip comments and empty lines
            if (!line.trim() || line.trim().startsWith('#')) {
                continue;
            }

            // Split the line into parts (IP address and domain)
            const parts = line.trim().split(/\s+/);

            // Check if this line has an IP address and domain
            if (parts.length >= 2) {
                const domain = parts[1];
                blockedWebsites.push(domain);
            }
        }

        console.log('Blocked websites:');
        console.log(blockedWebsites);

        return blockedWebsites;
    } catch (err) {
        console.error(`Error reading hosts file: ${err}`);
        throw err;
    }
}

function removeBlockedWebsite(websiteToRemove, callback) {
    // Path to the hosts file (Windows)
    const hostsFilePath = 'C:\\Windows\\System32\\drivers\\etc\\hosts';

    // Read the hosts file
    fs.readFile(hostsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading hosts file: ${err}`);
            callback(err);
            return;
        }

        // Split the file content into lines
        const lines = data.split('\n');

        // Create a new array to store the modified lines
        const updatedLines = [];

        // Iterate through the lines and filter out the line to remove
        for (const line of lines) {
            // Skip comments and empty lines
            if (!line.trim() || line.trim().startsWith('#')) {
                updatedLines.push(line);
                continue;
            }

            // Split the line into parts (IP address and domain)
            const parts = line.trim().split(/\s+/);

            // Check if this line has an IP address and domain
            if (parts.length >= 2) {
                const domain = parts[1];
                // Check if the domain matches the one to remove
                if (domain !== websiteToRemove) {
                    updatedLines.push(line); // Keep the line
                }
            }
        }

        // Join the updated lines to form the new hosts file content
        const updatedContent = updatedLines.join('\n');

        // Write the updated content back to the hosts file
        fs.writeFile(hostsFilePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error(`Error writing to hosts file: ${err}`);
                callback(err);
                return;
            }

            console.log(`Removed ${websiteToRemove} from the hosts file.`);
            callback(null);
        });
    });
}

module.exports = { blockWebsite, getBlockedWebsites };