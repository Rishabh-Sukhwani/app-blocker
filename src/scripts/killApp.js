function killApp (matchedWindows) {
  matchedWindows.forEach(toKillWindow => process.kill(toKillWindow.owner.processId, 'SIGINT'));
}

module.exports = { killApp };
