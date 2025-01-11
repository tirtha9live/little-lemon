# from django.http import HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Menu
from django.core import serializers
from .models import Booking
from datetime import datetime
import json
from .forms import BookingForm
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse


def home(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')


class book(APIView):
    def get(self, request):
        form = BookingForm()
        return render(request, 'book.html', {'form': form})

    def post(self, request):

        form = BookingForm(request.data)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True}, safe=False)
        else:
            # Optionally return validation errors
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)


class Bookings(APIView):
    def get(self, request):
        return render(request, 'bookings.html')


#
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# @method_decorator(csrf_exempt, name='dispatch')
class Reservations(APIView):
    def get(self, request):
        bookings = list(Booking.objects.all().values())
        return JsonResponse(bookings, safe=False)

    def post(self, request):
        date = request.data.get('date')
        bookings = list(Booking.objects.filter(reservation_date=date).values())
        return JsonResponse(bookings, safe=False)


def menu(request):
    menu_data = Menu.objects.all()
    main_data = {"menu": menu_data}
    return render(request, 'menu.html', {"menu": main_data})


def display_menu_item(request, pk=None):
    if pk:
        menu_item = Menu.objects.get(pk=pk)
    else:
        menu_item = ""
    return render(request, 'menu_item.html', {"menu_item": menu_item})
