───────────────────
Setup Instructions
───────────────────

#use admin terminal and Change to
cd little-lemon-capstone
#install all dependecies
pipenv --python=3.12 install
pipenv shell
#launch vscode
code .
------------My SQL----------------
#setup mysql and from
mysql -u root -p
==>give root password set during installation

#create database
create database reservations;

#am creating a non root user and giving full permissions
create user 'fullstackdev'@'localhost' identified by 'fullstack321';
GRANT ALL ON *.* TO 'fullstackdev'@'localhost';
exit
------------Run Migrations----------------
#settings.py - updated with above data dont change
#perform migrations
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

------------Populate Database for Testing----------------
# lets create some turkish menu
# just paste the below in terminal to create some entries
python manage.py shell
from restaurant.models import Menu

menu_items = [
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
]

Menu.objects.bulk_create(menu_items)

-------create some users (no pass)-------
from django.contrib.auth.models import User  # Ensure you import the User model (adapt if you're using a custom user model)
from restaurant.models import Booking  # Import your Booking model
from datetime import date

# Step 3: Create a list of user instances
users = [
    User(username='alice', first_name='Alice', last_name='Smith', email='alice@example.com'),
    User(username='bob', first_name='Bob', last_name='Johnson', email='bob@example.com'),
    User(username='charlie', first_name='Charlie', last_name='Brown', email='charlie@example.com'),
    User(username='david', first_name='David', last_name='Williams', email='david@example.com'),
    User(username='eve', first_name='Eve', last_name='Davis', email='eve@example.com')
]

# Save all users at once
User.objects.bulk_create(users)
-------


#lets create some initial bookings (you can add more from the frontend - which requires authentication)

from your_app.models import Booking
from datetime import date
from django.contrib.auth.models import User

user = User.objects.get(pk=1) #lets assume this user is creating the bookings
#adjust the dates if needed in frontend I am allowing only 14 days advance booking
reservations = [
    Booking(username=user, first_name='Alice', reservation_date=date(2025, 1, 15), reservation_slot=14),  # Mon
    Booking(username=user, first_name='Bob', reservation_date=date(2025, 1, 16), reservation_slot=15),    # Tue
    Booking(username=user, first_name='Charlie', reservation_date=date(2025, 1, 17), reservation_slot=16), # Wed
    Booking(username=user, first_name='David', reservation_date=date(2025, 1, 18), reservation_slot=17),   # Thu
    Booking(username=user, first_name='Eve', reservation_date=date(2025, 1, 19), reservation_slot=18)      # Fri
]

Booking.objects.bulk_create(reservations)

-------create super user and generate token-----------
#create superuser with below password and generate token using djoser api

POST http://localhost:8000/api/auth/token/login/
Content-Type: application/json

{
	  "username": "tirtha9",
	  "password": "admin321"
}

#response like below means djoser working correctly:
{
  "auth_token": "68ee0fb825b4cb07476dfea07d98ea378be6cf63"
}

#this means djoser is working fine!

#created from frontend
{
    "username": "swati20",
    "email": "swati20@gmail.com",
    "password": "tirthankardas"
}

─────────────────
Grading Criteria
─────────────────


#1 Does the web application use Django to serve static HTML content?
    → Static Dynamic both are served, have used DTL and Javascript
    → 'static' folder is also used for JS/CSS

#2 Has the learner committed the project to a Git repository?


#3 Does the application connect the backend to a MySQL database? - Yes
    → Dont change the settings.py file, refer to the setup instructions above

#4 Are the menu and table booking APIs implemented? - Yes

Booking API
Navigate to /book/
    Booked slots for the chosen date will be greyed out
        Non Staff Login:
            It will just say 'BOOKED' <slot HRs>
        Staff Login (eg Superuser)
            It will Show <Customer Name> <slot HRs>
            They will also see an extra navigation 'Reservations' which shows a Json dump of all reservations


#5 Is the application set up with user registration and authentication?
Djoser + DTL
    New users can Register
    Use Login Button on top right corner

#6 Does the application contain unit tests?


#7 Can the API be tested with the Insomnia REST client?
Yes - refer to the 'rest-api_tests.http' file for REST testing
