const email_phone = document.getElementById('email_phone');
document.getElementById('form_sign_in').addEventListener('submit', async (event) => {
    event.preventDefault()
    fetch('/api/user_sign_in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_phone: email_phone.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.exist) {
                signInValid()
                document.getElementById('alert_message').innerHTML = ''
            }
            if (!data.exist) {
                document.getElementById('alert_message').innerHTML = 'Invalid email or phone number'
            }
    })
})
function form(show,form) {
    if (show === 'show') {
        form.classList.remove('hidden')
        form.classList.remove('off')
        form.classList.add('on')
    }
    else {
        form.classList.remove('on')
        form.classList.add('off')
    }
}
document.getElementById('go_back').addEventListener('click', async (event) => {
    event.preventDefault()
    form('show',document.getElementById('form_sign_in'))
    form('hide',document.getElementById('form_password'))
})
function signInValid() {
    form('hide',document.getElementById('form_sign_in'))
    form('show',document.getElementById('form_password'))
    document.getElementById('welcome').innerHTML = `Welcome back, ${email_phone.value}!`
}
const password = document.getElementById('password');
document.getElementById('form_password').addEventListener('submit', async (event) => {
    event.preventDefault()
    fetch('/api/user_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_phone: email_phone.value,
            password: password.value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.correct) {
                document.getElementById('alert_message').innerHTML = 'Wrong password'
            }
            else {
                window.location.href = '/main_interface/html files/landing.html'
            }
    })
})