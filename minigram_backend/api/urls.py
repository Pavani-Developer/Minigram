from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('registeruser/', views.registerView),
    # path('userslist/', views.getusersView),
    path('user/<str:username>/', views.getuserView),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/profileupdate/', views.user_profile_update, name='user-profile-update'),
]
#http://127.0.0.1:8000/user/profile/update/