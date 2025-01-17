# from django.http import HttpResponse
from django.shortcuts import render
from .models import Menu
from .models import Booking
from .forms import BookingForm
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView
from django.http import JsonResponse, HttpResponse
from .serializers import MenuSerializer
from rest_framework.permissions import IsAuthenticated


def home(request):
    return render(request, 'index.html')


def about(request):
    return render(request, 'about.html')

class book(APIView):
    def get(self,request):
        form = BookingForm()
        return render(request,'book.html',{'form': form})

    def post(self, request):
        form = BookingForm(request.data)
        if form.is_valid():
            # Create booking object but don't save to database yet
            booking = form.save(commit=False)
            # Set the username field to the current user (as we excluded in forms)
            booking.username = request.user
            # Now save to database
            booking.save()
            return JsonResponse({'success': True}, safe=False)
        else:
            # Optionally return validation errors
            return JsonResponse({'success': False, 'errors': form.errors}, status=400)

#reservation page
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
    return render(request, 'menu.html', {"menu": main_data, 'user1': request.user})



class MenuItemView(ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class SingleMenuItemView(RetrieveUpdateAPIView, DestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer









from .forms import  UserForm
#user login and authentication
def login(request):
    form = UserForm()
    return render(request, 'login.html',  {'form': form})


from django.views.generic import FormView
from django.urls import reverse_lazy


class login_register(FormView):
    template_name = 'login_register.html'
    form_class = UserForm
    success_url = reverse_lazy('bookings')

    def form_valid(self,form):
        form.save()
        return super().form_valid(form)

    def form_invalid(self,form):
        return self.render_to_response(
            self.get_context_data(
                form=form,
                tab='register'
            )
        )
