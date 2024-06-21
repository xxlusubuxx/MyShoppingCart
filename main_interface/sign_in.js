const sign_in = document.getElementById('email_phone');
const alert_container = document.getElementById('alert');
function validate() {
    const inputValue = sign_in.value.trim();
    const alertMessage = document.getElementById('alert_message');

    if (alertMessage) {
        alert_container.removeChild(alertMessage);
    }

    if (inputValue === '') {
        displayAlert('Please enter your email or phone number');
        return false;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
    const isValidPhone = /^\d{10}$/.test(inputValue);

    if (!isValidEmail && !isValidPhone) {
        displayAlert('Please enter your correct email or phone number');
        return false;
    }
    else return true;
}
function displayAlert(message) {
    const alertMessage = document.createElement('h5');
    alert_container.appendChild(alertMessage);
    alertMessage.innerText = message;
    alertMessage.id = 'alert_message';
}
document.getElementById('continue').addEventListener('click', () => {
    validate();
        fetch("/api/user_data", {
            method: "POST",
            body: JSON.stringify({
                email_phone: sign_in,
                terms_of_agreement: document.getElementById('terms_of_agreement').checked,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {return res.json()})
        .then((data) => console.log(data));
    
})

