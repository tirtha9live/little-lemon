# Generated by Django 5.1.4 on 2025-01-01 07:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservation', '0003_remove_booking_comment_remove_booking_guest_number_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='booking',
            unique_together={('first_name', 'reservation_date', 'reservation_slot')},
        ),
    ]
