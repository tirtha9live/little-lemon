from django.db import models
from rest_framework.exceptions import ValidationError
from datetime import datetime

# Create your models here.
from django.contrib.auth.models import User
class Booking(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    first_name = models.CharField(max_length=200)
    guestCount = models.IntegerField(default=1)
    reservation_date = models.DateField()
    reservation_slot = models.SmallIntegerField(default=14)


    class Meta:
        unique_together = ['first_name', 'reservation_date', 'reservation_slot']


    def __str__(self): 
        return self.first_name

    def clean(self):
        # Get the day of the week for the reservation_date
        # assuming self.reservation_date is a string in 'YYYY-MM-DD' format
        date_obj = datetime.strptime(str(self.reservation_date), '%Y-%m-%d').date()
        day_of_week = date_obj.weekday()# 0 = Monday, 6 = Sunday
        #day_of_week = self.reservation_date.weekday()

        if self.guestCount not in range(1, 11):
            raise ValidationError("Guest count must be between 1 and 10")

        # Validate reservation_slot based on day_of_week
        if day_of_week in range(0, 5):  # Mon-Fri
            if self.reservation_slot < 14 or self.reservation_slot > 22:
               raise ValidationError("Reservations on Mon-Fri must be between 2pm and 10pm.")
        elif day_of_week == 5:  # Saturday
            if self.reservation_slot < 14 or self.reservation_slot > 23:
                raise ValidationError("Reservations on Saturday must be between 2pm and 11pm.")
        elif day_of_week == 6:  # Sunday
            if self.reservation_slot < 14 or self.reservation_slot > 21:
                raise ValidationError("Reservations on Sunday must be between 2pm and 9pm.")

    def save(self, *args, **kwargs):
        # Call the clean method before saving
        self.clean()
        super().save(*args, **kwargs)



# Add code to create Menu model
class Menu(models.Model):
   name = models.CharField(max_length=200, unique=True)
   price = models.IntegerField(null=False) 
   menu_item_description = models.TextField(max_length=1000, default='') 


   def __str__(self):
      return self.name
