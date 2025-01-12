from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name="home"),
    path('about/', views.about, name="about"),
    path('book/', views.book.as_view(), name="book"),
    path('menu/', views.menu, name="menu"),
    path('menu_item/<int:pk>/', views.display_menu_item, name="menu_item"),
    path('bookings/', views.Bookings.as_view(), name="bookings"),
    path('reservations/', views.Reservations.as_view(), name="reservations"),
]