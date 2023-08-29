from django.db import models
from datetime import date
# from users_app.models import Users 
from forum_topics_app.models import ForumTopics
# Create your models here.
class Posts(models.Model):
    content = models.CharField()
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")
    topic_id = models.ForeignKey(ForumTopics, on_delete=models.CASCADE, related_name="posts")
    edited = models.BooleanField(default=False)
    date_created = models.DateField(default=date.today)
    title = models.CharField() 
    reaction = models.CharField() 

