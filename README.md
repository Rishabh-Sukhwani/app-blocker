<h1 align="center">Application Blocker</h1>

Application blocker is a desktop app built using electronJS which runs html, css, js and nodejs. It can be used for blocking usage for apps and websites effectively working like an app to control distractions. It also has built in features like a dashboard and a section to view logs.

## Installation

run the following code to clone the repository to your local machine:

```bash
git clone https://github.com/Rishabh-Sukhwani/app-blocker.git
```

Before running the application, it is important to set an environment variable which contains the key used for log in, to do this follow the given steps:

1. Tap Win + I to access the Settings menu.
2. Scroll to the bottom of the page and click “About.”
3. Navigate to “Device Specifications” and press “Advanced System Settings.”
4. In the “System Properties” dialogue box, hit “Environmental Variables.”
5. Pick the “System” environmental variable and tap the “New” button located next to your selected section.
6. Assign the new variable a name, ensuring that there are no spaces.
7. Head to the “Variable Value” section to assign the variable the desired location. You can do this by clicking the “Browse Directory” or the “Browse File” buttons and searching the list displayed.
8. Click “OK” once the variable name and value have been created.

Note: The variable name should be:

```
APP_BLOCKER_KEY
```

Set its value to any thing that you want. Remember this value as this will be the key to log in to the application.

Then cd into the directory where the repo is cloned and run the following command:

```bash
npm start
```

## Features:

* **Applications**: Select an app from installed apps and add it to the block list to stop it from opening.

* **Websites**: Add a website to the blocklist to stop it from loading.

* **Dashboard**: View all the information about blocked apps and websites.

* **Logs**: View structured logs with color higlighting the different levels of each individual log.

## Working:

* **Applications**: The blocking logic periodically checks for open windows and matches them against a list of user-defined application names. Here's how it works:

    1. Monitoring Windows: The code regularly scans for currently open windows.

    2. Matching: It compares the titles of these windows with a list of known application names.

    3. Blocking: If a window's title contains any of the known application names, the code blocks that window, preventing the user from accessing it.

    4. Notification: A notification is displayed to inform the user that certain applications have been blocked.

    5. Logging Errors: Any errors encountered during this process are logged for debugging.

    6. Continuous Monitoring: This logic runs at predefined intervals, ensuring real-time monitoring and blocking of applications.

* **Websites**: Blocking utilizes the following logic.

    1. Appends an entry to the Windows hosts file, redirecting the specified website's domain to the localhost IP (127.0.0.1).
    2. Utilizes the exec function to execute the necessary command.
    3. Displays error messages if any issues occur during the blocking process.
    4. Prints a confirmation message upon successful blocking.

