from django.test import TestCase
from django.contrib.auth.models import User
from .models import Booking,Menu
from datetime import date  # To use date for bookings
# To catch errors when there is a duplicate entry (Unique=True cases)
from django.db import IntegrityError


# test Menu features like adding and checking menu items
class MenuModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.menu_item = Menu.objects.create(
            name="Kebap",
            price=15,
            menu_item_description="Grilled and spiced meat served with rice or bulgur."
        )

    def test_menu_item_fields(self):
        self.assertIsInstance(self.menu_item.name,str)  # Check if menu name is a string
        self.assertIsInstance(self.menu_item.price,int)  # Check if price is an integer
        self.assertIsInstance(self.menu_item.menu_item_description,str)  # Check if description is a string

    def test_menu_name_unique(self):
        # This test checks if the name of the menu item is unique
        # Tries to create another menu with the same name, cannot be
        # two menu items with exact same name
        with self.assertRaises(IntegrityError):  # We expect an error here
            duplicate_menu_item = Menu.objects.create(
                name="Kebap",  # Same name as before, should not work
                price=12,
                menu_item_description="Another description"
            )


# test Booking features like making reservations
class BookingModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        # This runs before tests to create user and booking
        cls.user = User.objects.create(username='alice')
        cls.booking = Booking.objects.create(
            username=cls.user,
            first_name='Alice',
            reservation_date=date(2025,1,24),
            reservation_slot=14
        )

    def test_booking_fields(self):
        self.assertIsInstance(self.booking.first_name,str)
        self.assertIsInstance(self.booking.reservation_date,date)
        self.assertIsInstance(self.booking.reservation_slot,int)

    def test_unique_together(self):
        # Test to check if the combination of fields for a booking is unique
        # Trying to make a duplicate booking should fail
        with self.assertRaises(IntegrityError):  # Expecting an error when we do this
            duplicate_booking = Booking.objects.create(
                username=self.user,  # Same user (alice)
                first_name='Alice',  # Same first name
                reservation_date=date(2025,1,24),  # Same date
                reservation_slot=14  # Same slot too
            )

