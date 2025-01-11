───────────────────
Setup Instructions
───────────────────

#Change to
cd little-lemon-full-stack
#install all dependecies
pipenv --python=3.12 install
pipenv shell
#launch vscode
code .

#setup mysql and from
mysql -u root -p
==>give root password set during installation

#create database
create database reservations;

#am creating a non root user and giving full permissions
create user 'fullstackdev'@'localhost' identified by 'fullstack321';
GRANT ALL ON *.* TO 'fullstackdev'@'localhost';
exit

#settings.py - updated with above data dont change
#perform migrations
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

# lets create some turkish menu
python manage.py shell
from restaurant.models import Menu
Menu.objects.bulk_create([
    Menu(
        name="Kebap",
        price=15,
        menu_item_description="Grilled and spiced meat served with rice or bulgur."
    ),
    Menu(
        name="Lahmacun",
        price=8,
        menu_item_description="Thin and crispy flatbread topped with minced meat, vegetables, and spices."
    ),
    Menu(
        name="Dolma",
        price=10,
        menu_item_description="Vegetables like bell peppers or grape leaves stuffed with rice, herbs, and sometimes meat."
    ),
    Menu(
        name="Pide",
        price=12,
        menu_item_description="Boat-shaped Turkish pizza topped with cheese, meat, or vegetables."
    ),
    Menu(
        name="Baklava",
        price=7,
        menu_item_description="Sweet pastry made of layers of filo dough, filled with nuts and soaked in syrup."
    ),
])



─────────────────
Grading Criteria
─────────────────

#1 Is the app added to the installed apps list in the settings file? - Yes
#2 Is the database configuration updated inside the settings file? - Yes
#3 Were migrations performed? - Yes
#4 Are there three fields in the booking form: First name, Reservation date and Reservation slot? - Yes
#5 Does a date selector open up when you click on the reservation date field on the booking form? - Yes
    #create 3+ bookings we need in next steps

#6 Are all the bookings available as JSON data on the reservations page?
    #once the bookings are done - it should show up here

#7 Is duplicate booking prohibited on a specific date if the time is already booked? - Yes
    #backend - using model constrains 'unique_together' fields
    #frontend - Javascript will Grey out and disable the Booked Hours, Hover on Grey Slots would say 'BOOKED'

#8 Does changing the date refresh the booking data?
    #Yes the Booked slots will show in the right table, just toggle differt date to refresh
    #also for that day will booked slots be disabled and Greyout

#9 Is a duplicate booking on a specific date and time unavailable if the slot is already booked?
    #yes - not possible duplicate booking from both frontend and backend

#10 Can you display bookings for a specific date using the API?
    #first create some bookings in the 'Book' Page
    #then select any your your reservation date - if any booking will show in right table

#11 If there is no booking, does a No Booking message show for that date?
    #yes - use date picker in the book page

#12 Was fetch API used to retrieve data from the API? - Yes

#13 Is the current date automatically selected when you open the booking form?
    #yes - also will show if any bookings today


---------------Thank you----------------------