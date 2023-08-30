from django.db import models

# Create your models here.
class ForumTopics(models.Model):
    title = models.CharField() 
    rating = models.CharField()