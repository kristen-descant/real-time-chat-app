from django.db import models
# from users_app.models import User
from chat_rooms_app.models import ChatRoom
from users_app.models import User
# Create your models here.
class Message(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_sent')
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    reaction = models.CharField(max_length=255)

# def __str__(self):
#     return f" id:{self.id} message from {self.sender.username}: {self.content}."