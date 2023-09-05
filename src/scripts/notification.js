//const { Notification } = require('electron');

function showNotification() {
    const NOTIFICATION_TITLE = "App Blocker";
    const NOTIFICATION_BODY = "App(s) has been blocked.";
    
    new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
}

module.exports = { showNotification };


