from django.urls import path

from . import views

urlpatterns = [
    path('registeruser/', views.registerView),
    path('userslist/', views.getusersView),
]