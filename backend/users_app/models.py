from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    profile_picture = models.CharField(max_length=255)
    friends = models.ManyToManyField('self', blank=True, related_name='friend_of')
    display_name = models.CharField(unique=True,max_length=32)
    
    def __str__(self):
        return self.username

