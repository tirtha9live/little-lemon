// Field validation
function validateFields() {
    const username = document.getElementById ('id_username');
    const email = document.getElementById ('id_email');
    const password = document.getElementById ('id_password');

    // Empty field validation
    [username, email, password].forEach (field => {
        field.addEventListener ('input', () => {
            field.style.borderColor = field.value.trim () === '' ? 'red' : 'initial';
        });
    });

    // Email validation
    email.addEventListener ('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        email.style.borderColor = emailRegex.test (email.value) ? 'green' : 'red';
    });

    // Password validation with green tick
    const passwordContainer = password.parentElement;
    const tickMark = document.createElement ('span');
    tickMark.innerHTML = '✓';
    tickMark.style.color = 'green';
    tickMark.style.display = 'none';
    tickMark.style.marginLeft = '10px';
    passwordContainer.appendChild (tickMark);

    password.addEventListener ('input', () => {
        const isValid = password.value.length >= 8;
        password.style.borderColor = isValid ? 'green' : 'red';
        tickMark.style.display = isValid ? 'inline' : 'none';
    });
}


//is superuser
async function isSuperuser(){
    const endpoint = '/api/auth/users/me/'
    let response = await fetch(endpoint,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.authtoken}`
        }
    })
    let data = await response.json()
    if (data.is_staff){
        localStorage.setItem('is_staff', data.is_staff)
    }else {localStorage.setItem('is_staff', false)}
    return data
}

async function userLogin(event){
    event.preventDefault()
    let username = document.getElementById('loginusername').value
    let password = document.getElementById('loginPassword').value

    endpoint='/api/auth/token/login/'

    let payload = JSON.stringify(
            {
                  "username": username,
                  "password": password
            })
    let response = await fetch(endpoint, {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: payload
    });
    let data = await response.json()

    if(data.auth_token){
        localStorage.setItem('authtoken', data.auth_token)
        localStorage.setItem('username', username)
        alert('Login Successful!')
        await isSuperuser()
        window.location.href='/book/'
        return data.auth_token
    }else {
        alert('Login Failed!')
    }

}
// ---------- declare functions above-----call below------
let password = document.getElementById ('id_password')
password.type = 'password'
let endpoint = '/api/auth/users/'
let submitButton = document.getElementById ('submit')

let headers = {
    'Accept': 'application/json' ,
    'Content-Type': 'application/json'
};

function collectPayload() {
    let username = document.getElementById ('id_username').value
    let email = document.getElementById ('id_email').value
    let password = document.getElementById ('id_password').value
    return JSON.stringify ({
        username: username ,
        email: email ,
        password: password ,
    })
}


window.registerUser = async function registerUser() {
    let payload = collectPayload ()
    try {
        let response = await fetch (endpoint , {
            method: 'POST' ,
            headers: headers ,
            body: payload
        });
        let data = await response.text ();
        return data
    } catch (error) {
        console.log (error)
    }
}

// add eventlistener

// Event listener
submitButton.addEventListener ('click' , async (event) => {
    validateFields ();
    event.preventDefault ();

    let serverResponse = JSON.parse (await registerUser ())
    if (serverResponse.id) {
        alert ('registered successfully!')
        window.location.href='/login/'
    } else if (serverResponse.username && serverResponse.password) {
        alert ('cant be blank')
    } else if (serverResponse.username) {
        alert ('username already exists')
    } else if (serverResponse.email) {
        alert ('email already exists')
    } else {
        alert ('Not registered')
    }

})

//login/register tabbed UI
const urlParams = new URLSearchParams (window.location.search);
const tab = urlParams.get ('tab');

if (tab === 'register') {
    const registerTab = new bootstrap.Tab (document.querySelector ('#register-tab'));
    registerTab.show ();
}

