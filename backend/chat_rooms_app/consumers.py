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

    #grab the most recent message index from the list of messages, grab the previous (50) or whatever. 
    def updated_message_db(self, oldest_message_id=0):
        #this function retrieves the last 50 messages if no message id is provided.
        #if a message id is provided, it will grab the last 50 from that point.
        if oldest_message_id==0:
            oldest_message_id = ChatRoom.objects.get(id=self.chat_room_id).messages.all().order_by('-id').first()     #this sets it to the most recent message.       
        retrieved_messages = ChatRoom.objects.get(id=self.chat_room_id).messages.filter(date__lt=Message.objects.get(oldest_message_id).date).order_by('-date')[:50]
        self.send(text_data=json.dumps({"messages":retrieved_messages}))

    def connect(self):
        
        # self.users_id = self.scope.get("headers", {}).get(b'users', b"").decode("utf-8")
        # user = User.objects.get(id=user_id)

        user1 = self.users_id.filter('user1')
        user2 = self.users_id.filter('user2')
        roomid = f"user{user1.id}user{user2.id}"
        roomid2 = f"user{user2.id}user{user1.id}"
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        if ChatRoom.objects.get(id=roomid):
            chat_room, created = ChatRoom.objects.create()
            self.chat_room_id = chat_room.id 
        elif ChatRoom.objects.get(id=roomid2):
            chat_room, created = ChatRoom.objects.create()
            self.chat_room_id = chat_room.id 
        else:
            # Fetch or create a ChatRoom instance
            chat_room, created = ChatRoom.objects.get_or_create()
            self.chat_room_id = chat_room.id 

        try:         
            # user.chat_rooms.add(chat_room)  # Add the chat_room to the user's chat_rooms field
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )
            if created:
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
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user = User.objects.get(text_data_json["user"])
        ###########TEXT_DATA.user expects a json key value pair of "user":"user.id"###############
        user.messages.add(message)
        ##########################################################################################
        Message.create(content=message, chat_room=self.chat_room_id)        

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            ############################################## "message":f"{username}:{message}" to make it more of a chat room. 
            # This edits the message itself, so in the chat_message function below it will be message = message, displaying as message : {username}:{message}.
            self.room_group_name, {"type": "chat.message", "message": f"{self.user.display_name}: {message}"} 
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        # self.send(text_data=ChatRoom.objects.get(self.chat_room_id).messages.sort('ascending')[:1]) (sends most recent message)
        self.send(text_data=json.dumps({"message": message}))

#########################################
# chat_message function will send the message (echo) it receives