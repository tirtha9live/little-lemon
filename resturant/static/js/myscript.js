

document.addEventListener('DOMContentLoaded', function() {
        function clearForm() {
            id_first_name.value = '';
            id_reservation_date.type = 'date';
            id_reservation_date.min = '';
            id_reservation_date.max = '';
            id_reservation_slot.value = '14';
        }

        clearForm();

        const dateInput = document.getElementById('id_reservation_date');
        const timeInput = document.getElementById('id_reservation_slot');

        // Set date range
        const today = new Date();
        //const tomorrow = new Date(today);
        //tomorrow.setDate(today.getDate() + 1);
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 13);

        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = twoWeeksLater.toISOString().split('T')[0];
        dateInput.value = today.toISOString().split('T')[0];

        // Create time select dropdown
        const select = document.createElement('select');
        select.name = timeInput.name;
        select.id = timeInput.id;
        select.required = timeInput.required;

        const hours = [
            {value: "14", display: "2 PM"},
            {value: "15", display: "3 PM"},
            {value: "16", display: "4 PM"},
            {value: "17", display: "5 PM"},
            {value: "18", display: "6 PM"},
            {value: "19", display: "7 PM"},
            {value: "20", display: "8 PM"},
            {value: "21", display: "9 PM"},
            {value: "22", display: "10 PM"},
            {value: "23", display: "11 PM"}
        ];

        hours.forEach(hour => {
            const option = document.createElement('option');
            option.value = hour.value;
            option.textContent = hour.display;
            select.appendChild(option);
        });

        timeInput.parentNode.replaceChild(select, timeInput);

        // Update available hours based on selected date
        dateInput.addEventListener('change', function () {
            const selectedDate = new Date(this.value);
            const day = selectedDate.getDay();
            const options = select.options;

            // Reset all options
            for (let option of options) {
                option.disabled = false;
            }

            // Apply restrictions based on day
            if (day === 0) { // Sunday
                for (let option of options) {
                    if (parseInt(option.value) > 21) {
                        option.disabled = true;
                    }
                }
            } else if (day === 6) { // Saturday
                // All hours available
            } else { // Monday to Friday
                for (let option of options) {
                    if (parseInt(option.value) > 22) {
                        option.disabled = true;
                    }
                }
            }
        });


        function showbookings() {


            const endpoint = '/reservations/';
            const booking_date = document.getElementById('id_reservation_date');
            guestTableBody = document.querySelector('#guest-table tbody')


            booking_date.addEventListener('change', checkbookings);
            checkbookings()

// Declare the variable in the outer scope
            let bookingData = null;

            function checkbookings() {


                let payload = {"date": booking_date.value};

                fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                    .then(response => response.json())
                    .then(data => {
                        //console.log(data);
                        // Store the fetched data in the outer scope variable
                        bookingData = data; // Now you can access this variable outside
                        // You can also perform other actions here as needed
                        if (bookingData.length > 0) {
                            guestTableBody.innerHTML = '';

                            for (let i = 0; i < bookingData.length; i++) {
                                let booked_slot = bookingData[i]?.reservation_slot;
                                let booking_name = bookingData[i]?.first_name;

                                //console.log(booked_slot)
                                // Get the select element
                                let selectElement = document.getElementById('id_reservation_slot');
                                // Disable the option with value 20
                                selectElement.querySelector(`option[value="${booked_slot}"]`).disabled = true;
                                // Add a tooltip to the disabled option
                                selectElement.querySelector(`option[value="${booked_slot}"]`).title = 'BOOKED';

                                //also show the bookings info
                                guestTableBody.innerHTML += `<tr><td>${booking_name}</td><td>${booked_slot} Hrs</td></tr>`;

                                // console.log(`Reservation Slot: ${bookingData[i].reservation_slot}`);
                                //console.log("------------------------");
                            }
                        }
                        //if no bookings show No Bookings
                        clearbookings()
                    })
                    .catch(error => console.error('Error fetching bookings:', error));
            }


            function clearbookings() {
                if (bookingData === null || bookingData.length === 0) {
                    guestTableBody.innerHTML = '<tr><td>No Bookings to Show</td></tr>'
                }
            }


        }
        showbookings()

    reservation_date = document.getElementById('id_reservation_date')

    function setDateonTable(){
                bookingTable = document.getElementById("bookings")
                bookingTable.innerHTML = 'Bookings for ' + reservation_date.value
    }
    reservation_date.addEventListener('change', setDateonTable)
    setDateonTable()
}

);

