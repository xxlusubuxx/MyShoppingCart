const email = document.getElementById('email');
const username = document.getElementById('username');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');
const alert_message = document.getElementById('alert');

document.getElementById('content_form').addEventListener('submit', (event) => {
    if (!validate(email, alert_message)||!validate(username, alert_message)||!validate(password1, alert_message)||!validate(password2, alert_message)) {
        event.preventDefault();
    }
})

document.getElementById('content_form').addEventListener('submit', async (event) => {
    const exist = await checkEmail(email.value);
    if (exist) {
        alert('Email or username already in use.');
    } else {
        event.target.submit();
    }
})

function validate(input,alert) {
    const inputValue = input.value;
    const alertMessage = document.getElementById('alert_message');

    function displayAlert(message) {
        const alertMessage = document.createElement('h5');
        alert.appendChild(alertMessage);
        alertMessage.innerText = message;
        alertMessage.id = 'alert_message';
    }

    if (alertMessage) {
        alert.removeChild(alertMessage);
    }
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
    const isValidUserName = /^[a-zA-Z0-9]+$/.test(inputValue);
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputValue);
    const isValidPassword2 = password1.value === password2.value;

    if (inputValue === '') {
        displayAlert('Please do not leave any field blank');
        return false;
    }
    if (input===email && !isValidEmail) {
        displayAlert('Please enter a valid email address');
        return false;
    }
    if (input===username && !isValidUserName) {
        displayAlert('Your username must contain only letters and numbers');
        return false;
    }
    if (input===password1 && !isValidPassword) {
        displayAlert('Your password must be at least 8 characters long and contains at least 1 capital letter, 1 small letter, 1 number and 1 special character');
        return false;
    }
    if (input===password2 && !isValidPassword2) {
        displayAlert('The re-entered password does not match your password');
        return false;
    }
    return true
}
