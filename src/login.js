document.addEventListener('DOMContentLoaded', function () {
  // Get the input element and button
  const keyInput = document.querySelector('input[type="password"]');
  const signInButton = document.querySelector('.button-login');

  // Add a click event listener to the button
  signInButton.addEventListener('click', function () {
    // Get the entered key from the input field
    const enteredKey = keyInput.value;

    // Check if the entered key matches the environment variable
    if (window.electronAPI.isKeyValid(enteredKey)) {
      console.log('Successful');
      window.electronAPI.loadFile('../index.html');
    } else {
      console.log('Failed');
      // eslint-disable-next-line no-undef
      alert('Wrong Key!');
    }
  });
});
