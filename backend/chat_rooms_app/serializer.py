from rest_framework import serializers
from .models import ChatRoom
from messages_app.serializers import MessageSerializer
from users_app.serializers import UserSerializer

class ChatRoomSerializer(serializers.ModelSerializer):

    messages = MessageSerializer(many=True, read_only=True)
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = '__all__'