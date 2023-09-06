from rest_framework import serializers
from .models import Message

class FriendlessUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id', 'date', 'sender', 
            'chat_room', 'content', 'reaction'
        ]



    # id = models.BigAutoField(primary_key=True)
    # date = models.DateTimeField(auto_now_add=True)
    # sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_sent')
    # chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    # content = models.TextField()
    # reaction = models.CharField(max_length=255)