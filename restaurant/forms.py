from django.forms import ModelForm
from django import forms
from .models import Booking
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class BookingForm(ModelForm):
    class Meta:
        model = Booking
        fields = '__all__'
        exclude = ['username',]
        labels = {
            'first_name': 'Booking First Name',
            'guestCount': 'No. of Guests (max 8 per booking)'
        }
        widgets = {
            'reservation_slot': forms.NumberInput(attrs={
                'min': 14,
                'max': 23,
                'value': 14,
                'type': 'number',  # Explicitly set input type
                #'class': 'form-control',  # Optional: for styling
            }),
            'guestCount': forms.NumberInput(attrs={
                'min': 1,
                'max': 8,
                'value': 1,
                'type': 'number',  # Explicitly set input type
                # 'class': 'form-control',  # Optional: for styling
            }),

        }

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        help_texts = {
            'username': 'Choose your username',  # Custom help text
            'password': 'Minimum 8 Characters'  # Custom help text
        }

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        email = cleaned_data.get('email')

        if User.objects.filter(username=username, email=email).exists():
            raise ValidationError("A user with this username and email already exists.")
        return cleaned_data