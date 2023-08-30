from django.urls import path
from users_app import views
from .views import UserProfileRetrieveUpdateView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('login/', views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),
    path('profile/', views.get_user_profile, name='users-profile'),
     path('profile/update/', views.update_user_profile, name='user-profile-update'),
    path('', views.get_users, name='users'),
    path('profile/<int:pk>/', UserProfileRetrieveUpdateView.as_view(), name='user-profile-detail'),
]

