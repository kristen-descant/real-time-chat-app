# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import ChatRoom
from users_app.models import User
from messages_app.models import Message

class ChatConsumer(WebsocketConsumer):
    user_ids = {}
    chat_room_id = "" 

    #grab the most recent message index from the list of messages, grab the previous (50) or whatever. 
    # def updated_message_db(self, oldest_message_id=0):
    #     #this function retrieves the last 50 messages if no message id is provided.
    #     #if a message id is provided, it will grab the last 50 from that point.
    #     oldest_message = ChatRoom.objects.get(id=self.chat_room_id).messages.all().order_by('-id').first()
    #     if oldest_message:
    #         oldest_message_id = oldest_message.id
    #     else:
    #         # Handle the case where no messages exist in the chat room.
    #         oldest_message_id = 0

    #     retrieved_messages = ChatRoom.objects.get(id=self.chat_room_id).messages.filter(date__lt=Message.objects.get(oldest_message_id).date).order_by('-date')[:50]
    #     self.send(text_data=json.dumps({"messages":retrieved_messages}))

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        print("roomname:",self.room_name)
        self.users = self.room_name.split("user") #[user1, user2]
        print("self.users:",self.users)
        ############################################
        user1 = self.users[1]
        user2 = self.users[2] #errors when assuming two users are passed and only one is passed.
        self.user_ids={"user1":user1,"user2":user2}
        
        roomid = f"user{user1}user{user2}"
        roomid2 = f"user{user2}user{user1}"
        print("roomid:",roomid,"roomid2",roomid2)

        from django.db.models import Q
        try:
            chat_room = ChatRoom.objects.get(Q(room_id=roomid) | Q(room_id=roomid2))
            self.room_group_name = f"chat_{chat_room.room_id}"
        except ChatRoom.DoesNotExist:
            # Fetch or create a ChatRoom instance
            chat_room = ChatRoom.objects.create(room_id=roomid)
            user = User.objects.get(id=user1)
            chat_room.users.add(user.id)
            # chat_room.user.add(User.objects.get(user1))
            otherUser = User.objects.get(id=user2)
            chat_room.users.add(otherUser.id)
            self.room_group_name = f"chat_{roomid}"
        
        self.chat_room_id = chat_room.room_id 
        #####################################################################
        try:         
            # user.chat_rooms.add(chat_room)  # Add the chat_room to the user's chat_rooms field
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
        print("TEXT DATA:", text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        user_id = text_data_json.get("user")
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                print(user)
            except User.DoesNotExist:
                print("no such user.")
        # else:
        #     # Handle the case where "user" is not provided or is an empty string

        print(  f"""
                CHAT ROOM ID
                {self.chat_room_id}
                """)
        chat_room_object = ChatRoom.objects.get(room_id=self.chat_room_id)
        print("message:",message,"chat_room:",chat_room_object,"sender",user)
        Message.objects.create(content=message, chat_room= chat_room_object, sender=user)        

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {"type": "chat.message", "message": message} 
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event["message"]
        self.send(text_data=json.dumps({"message": message}))
