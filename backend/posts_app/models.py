from django.db import models
from datetime import date
from users_app.models import User
from forum_topics_app.models import ForumTopics
# Create your models here.
class Posts(models.Model):
    content = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")
    topic_id = models.ForeignKey(ForumTopics, on_delete=models.CASCADE, related_name="posts")
    edited = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    title = models.CharField() 
    up = models.IntegerField(default=0)
    down = models.IntegerField(default=0) 

