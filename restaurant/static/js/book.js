// Variables declaration
let endpoint = '/book/';
let rawData;


const headers = {
    'Accept': 'application/json' ,
    'Content-Type': 'application/json',
    'Authorization': `Token ${localStorage.authtoken}`

};

// Function definitions
function myalert(message) {
    alert (message)
}

async function callBookingAPI(payload) {
    try {
        let response = await fetch (endpoint , {
            method: 'POST' ,
            headers: headers ,
            body: payload
        });
        rawData = await response.text ();
        return rawData;
    } catch(error) {
        rawData = error.message;
        console.log ('Network error:' , error.message);
        return error;
    }
}

async function tryBooking() {
    try {
        let first_name = document.getElementById ('id_first_name').value
        let reservation_date = document.getElementById ('id_reservation_date').value
        let reservation_slot = document.getElementById ('id_reservation_slot').value
        let guestcount = document.getElementById ('id_guestCount').value

        const payload = JSON.stringify ({
            "first_name": first_name,
            "guestCount": guestcount,
            "reservation_date": reservation_date,
            "reservation_slot": reservation_slot
        });

        let bookingstatus = await callBookingAPI (payload)
        if (JSON.parse (bookingstatus)['success']) {
            myalert ('Booking Successful')
        } else {
            myalert ('Sorry, booking failed!')
        }
    } catch(error) {
        console.error (error)
    }
}

// Event listener
const form = document.getElementById ('booking-form')
form.addEventListener ('submit' , async (event) => {
    event.preventDefault ();
    await tryBooking ();
    form.reset ()
});
//
//welcome user
function greetuseronlogin() {
    // Retrieve the username from localStorage
    var username = localStorage.getItem ('username');

    // Check if username exists, avoid XSS by using textContent
    if (username) {
        document.getElementById ('username').textContent = username;
    } else {
        document.getElementById ('username').textContent = "Guest"; // Default value if not set
    }
}

greetuseronlogin ()

function checkAuthAndShowForm() {
    let bookingFormDiv = document.getElementById ('booking-form');

    if (!localStorage.getItem ('authtoken')) {
        bookingFormDiv.innerHTML = `
            <div class="alert alert-info">
                Please login to make a booking!
                <a href="/login/" class="btn btn-primary ml-2">Login</a>
            </div>
        `;
    }
}

checkAuthAndShowForm ()




