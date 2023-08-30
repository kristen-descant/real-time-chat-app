from django.urls import path
from users_app import views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.register_user, name='register'),
    path('profile/', views.get_user_profile, name='users-profile'),
     path('profile/update/', views.update_user_profile, name='user-profile-update'),
    path('', views.get_users, name='users'),
]