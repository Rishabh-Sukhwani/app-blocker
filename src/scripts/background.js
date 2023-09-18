const background = () => {
  // eslint-disable-next-line no-undef
  const selectedOptionsFromStorage = localStorage.getItem('selectedOptions');
  const selectedOptions = selectedOptionsFromStorage ? JSON.parse(selectedOptionsFromStorage) : [];
  console.log(selectedOptions);
};

module.exports = { background };
