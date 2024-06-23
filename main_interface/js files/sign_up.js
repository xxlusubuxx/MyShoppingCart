const email = document.getElementById('email');
const alert_email = document.getElementById('alert_email');
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

    if (inputValue === '') {
        displayAlert('Please enter your email');
        return false;
    }
    else if (!isValidEmail) {
        displayAlert('Please enter your correct email');
        return false;
    }
    else document.getElementById.content_form
}
document.getElementById('continue').addEventListener('click', () => {
    validate(email, alert_email)
        if (validate(email, alert_email)) {
            window.location.href = '/main_interface/html files/verifying_email.html'
        }
})