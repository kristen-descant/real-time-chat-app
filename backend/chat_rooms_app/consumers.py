# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ChatRoom
from users_app.models import User
from messages_app.models import Message

class ChatConsumer(WebsocketConsumer):
    user_id = ""
    chat_room_id = "" 

    def updated_message_db(self):
        messages = ChatRoom.objects.get(self.chat_room_id).sort()[:50] 
        self.send(text_data=json.dumps({"messages":messages}))

    def connect(self):
        
        self.users_id = self.scope.get("headers", {}).get(b'users', b"").decode("utf-8")
        user1 = self.users_id.filter('user1')
        user2 = self.users_id.filter('user2')

        try:
            # user = User.objects.get(id=user_id)
            self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = f"chat_{self.room_name}"

            # Fetch or create a ChatRoom instance
            chat_room, created = ChatRoom.objects.get_or_create()
            self.chat_room_id = chat_room.id 
            # chat_room.users.add(user)  # Add the user to the users field

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )
           
            if created == True:
                self.accept()
            else:
                self.updated_message_db()
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
        user = User.objects.get(id=self.user_id).messages.add(message)
        Message.create(content=message, chat_room=self.chat_room_id)
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

