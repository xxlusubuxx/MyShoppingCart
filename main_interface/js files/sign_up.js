const email =  document.getElementById('email');
const username =  document.getElementById('username');
const password =  document.getElementById('password');
const password2 =  document.getElementById('password2');
const alert_message = document.getElementById('alert');

document.getElementById('content_form').addEventListener('submit', async (event) => {
    if (!validate(email, alert_message)||
        !validate(username, alert_message)||
        !validate(password, alert_message)||
        !validate(password2, alert_message)||
        !checkEmail(email)) {
            event.preventDefault()
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
        const isValidPassword2 = password.value === password2.value;
        fetch("/api/user_data/duplicate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                username: username.value,
                password: password.value
            })
        })
        .then((res) => {return res.json()})
        .then(data => {
            if (data.duplicate) {
                displayAlert('Email already in use');
                return false;
            }
        })
        if ( input === email && !isValidEmail) {
            displayAlert('Please enter a valid email address');
            return false;
        }
        else if ( input === username && !isValidUserName) {
            displayAlert('Your username must contain only letters and numbers');
            return false;
        }
        else if ( input === password && !isValidPassword) {
            displayAlert('Your password must be at least 8 characters long and contains at least 1 capital letter, 1 small letter, 1 number and 1 special character');
            return false;
        }
        else if ( input === password2 && !isValidPassword2) {
            displayAlert('The re-entered password does not match your password');
            return false;
        }
        else return true;
}