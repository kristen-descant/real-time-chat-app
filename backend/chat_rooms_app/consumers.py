# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ChatRoom
from users_app.models import User

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # user_id = self.scope.get("headers", {}).get(b'users', b"").decode("utf-8")
        
        try:
            # user = User.objects.get(id=user_id)
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"chat_{self.room_name}"

            # Fetch or create a ChatRoom instance
            chat_room, created = ChatRoom.objects.get_or_create()
            # chat_room.users.add(user)  # Add the user to the users field

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )

            self.accept()
        except User.DoesNotExist:
            # Handle user not found error
            pass

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        # user = User.objects.get(id=user_id)
        # user.messages.add(message)  # Add the user to the users field

        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            ############################################## "message":f"{username}:{message}" to make it more of a chat room. 
            # This edits the message itself, so in the chat_message function below it will be message = message, displaying as message : {username}:{message}.
            self.room_group_name, {"type": "chat.message", "message": message} 
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        self.send(text_data=json.dumps({"message": message}))