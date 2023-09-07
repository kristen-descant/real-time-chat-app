from django.db import models
from users_app.models import User

# Create your models here.
class ChatRoom(models.Model):
    id = models.BigAutoField(primary_key=True)
    room_id = models.CharField(max_length=255, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User, related_name="chat_room")
    # You can remove the "messages" field

    def __str__(self):
        return f"chat room. Users:{self.users}"