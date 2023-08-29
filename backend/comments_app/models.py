from django.db import models
from posts_app.models import Posts
from datetime import date
#import users_app.models User 

# Create your models here.
class Comments(models.Model):
    content = models.CharField()
    # created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    edited = models.BooleanField(default=False)
    date_created = models.DateField(default=date.today)
    reaction = models.CharField() 