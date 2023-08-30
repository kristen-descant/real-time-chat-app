from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    display_name = models.CharField(max_length=100)
    profile_name = models.CharField(max_length=100, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    friends = models.ManyToManyField("self", blank=True, related_name='friends_list')
    last_login = models.DateTimeField(auto_now_add=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    
  

   
    def __str__(self):
        return self.username

