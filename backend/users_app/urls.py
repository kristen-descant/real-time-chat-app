from django.urls import path
from .views import Sign_up, Log_in, Log_out, Info, register_user, get_user_profile, update_user_profile, get_users

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('info/', Info.as_view(), name='info'),
    path('register/', Sign_up.as_view(), name='register_user'),
    path('profile/', get_user_profile, name='get_user_profile'),
    path('profile/update/', update_user_profile, name='update_user_profile'),
    path('users/', get_users, name='get_users')
]


