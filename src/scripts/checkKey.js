
function isValidKey(key) {
    const appBlockerKey = process.env.APP_BLOCKER_KEY;
    //console.log(appBlockerKey);
    if (key == appBlockerKey) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isValidKey };