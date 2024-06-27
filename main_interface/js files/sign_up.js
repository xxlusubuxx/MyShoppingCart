const email =  document.getElementById('email');
const username =  document.getElementById('username');
const password1 =  document.getElementById('password1');
const password2 =  document.getElementById('password2');
const alert_message = document.getElementById('alert');

document.getElementById('content_form').addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!validate(email, alert_message)||
        !validate(username, alert_message)||
        !validate(password1, alert_message)||
        !validate(password2, alert_message)) {return false}
    else {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/user_data', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
            if (JSON.parse(xhr.responseText)) {displayAlert('Email or username already exists');
            return false;}
        }
        xhr.send(JSON.stringify({email: email.value, username: username.value, password: password1.value}));
    }
})
function displayAlert(message) {
    const alertMessage = document.getElementById('alert_message');
    if (alertMessage) {
        document.getElementById('alert').removeChild(alertMessage);
    }
    const newAlertMessage = document.createElement('h5');
    document.getElementById('alert').appendChild(newAlertMessage);
    newAlertMessage.innerText = message;
    newAlertMessage.id = 'alert_message';
}
function validate(input, alert) {
        if (input.value === '') {
            displayAlert('Please leave no field blank');
            return false;
        }
        const inputValue = input.value.trim();
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
        const isValidUserName = /^[a-zA-Z0-9]+$/.test(inputValue);
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputValue);
        const isValidPassword2 = password1.value === password2.value;
        
        if ( input === email && !isValidEmail) {
            displayAlert('Please enter a valid email address');
            return false;
        }
        else if ( input === username && !isValidUserName) {
            displayAlert('Your username must contain only letters and numbers');
            return false;
        }
        else if ( input === password1 && !isValidPassword) {
            displayAlert('Your password must be at least 8 characters long and contains at least 1 capital letter, 1 small letter, 1 number and 1 special character');
            return false;
        }
        else if ( input === password2 && !isValidPassword2) {
            displayAlert('The re-entered password does not match your password');
            return false;
        }
        else return true;
}