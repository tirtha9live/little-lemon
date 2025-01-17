from django.urls import path, include
from . import views
from djoser.views import TokenCreateView


urlpatterns = [
    path('',views.home,name="home"),
    path('about/',views.about,name="about"),
    path('book/',views.book.as_view(),name="book"),
    path('menu/',views.menu,name="menu"),
    path('bookings/',views.Bookings.as_view(),name="bookings"),
    path('reservations/',views.Reservations.as_view(),name="reservations"),

    # API endpoints
    path('api/menu-items', views.MenuItemView.as_view()),
    path('api/menu-items/<int:pk>', views.SingleMenuItemView.as_view()),

    # djoser authentication
    path('api/auth/',include('djoser.urls')),
    path('api/auth/',include('djoser.urls.authtoken')),
    # user login and authentication
    path('login/',views.login_register.as_view(),name="login"),

]
