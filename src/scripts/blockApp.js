function getAllOpenWindowsWrapper () {
  window.electronAPI.getAllOpenWindows().then(window => {
    try {
      const words = window.title.split(' ');
      console.log(words.join('; '));

      const knownName = 'visual studio code';
      const matched = [];

      const knownNameWords = knownName.split(' ');

      // eslint-disable-next-line no-undef
      for (const window of windows) {
        if (knownNameWords.some(known => window.title.toLowerCase().includes(known.toLowerCase()))) {
          matched.push(window);
        }
      }

      console.log(matched);
    } catch (error) {
      console.error('Error: ', error);
    }
  });
}

module.exports = { getAllOpenWindowsWrapper };
