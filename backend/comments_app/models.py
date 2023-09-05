from django.db import models
from posts_app.models import Posts
from datetime import date
from users_app.models import User

# Create your models here.
class Comments(models.Model):
    content = models.CharField(max_length=255, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE, related_name="comments")
    edited = models.BooleanField(default=False)
    date_created = models.DateField(default=date.today)
    reaction = models.CharField(max_length=255 ,blank=True) 