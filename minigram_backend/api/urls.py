from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('registeruser/', views.registerView),
    path('user/<str:username>/', views.getuserView),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/userprofile/update', views.update_profile, name='user-profile-update'),
    path('userdata/<int:id>/', views.user_data, name='user-data'),
]
#http://127.0.0.1:8000/user/profile/update/