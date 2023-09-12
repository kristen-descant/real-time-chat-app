from django.db import models
from users_app.models import User
from forum_topics_app.models import ForumTopics
from django.contrib.postgres.fields import ArrayField
from datetime import datetime
# Create your models here.
class Posts(models.Model):
    content = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")
    topic_id = models.ForeignKey(ForumTopics, on_delete=models.CASCADE, related_name="posts")
    edited = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.today)
    title = models.CharField() 
    up = ArrayField(models.IntegerField(), default=list, blank=True)
    down = ArrayField(models.IntegerField(), default=list, blank=True)

