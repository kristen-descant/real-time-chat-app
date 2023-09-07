# chat/views.py
from django.shortcuts import render
from .models import ChatRoom
from users_app.models import User
from messages_app.models import Message
from rest_framework.views import APIView
from messages_app.serializers import MessageSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.authentication import TokenAuthentication
from .serializer import ChatRoomSerializer

# def index(request):
#     return render(request, "chat/index.html")

# def room(request, room_name):
#     return render(request, "chat/room.html", {"room_name": room_name})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updated_message_db(room_name, oldest_message_id=0):
    if oldest_message_id==0:
        oldest_message_id = ChatRoom.objects.get(id=room_name).messages.all().order_by('-id').first()     #this sets it to the most recent message.       
    
    retrieved_messages = ChatRoom.objects.get(id=room_name).messages.filter(date__lt=Message.objects.get(oldest_message_id).date).order_by('-date')[:50]
    serializer = MessageSerializer(retrieved_messages)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def Get_Chat_Rooms(request):
    
    user = request.user
    print(user)
    chat_rooms = user.chat_room
    serializer = ChatRoomSerializer(chat_rooms, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def Delete_Chat_Room(request):
    # user = request.user
    chat_room_room_id = request.data.get("chat_room")
    try:
        chat_room = ChatRoom.objects.get(room_id=chat_room_room_id)
        chat_room.delete()
    except ChatRoom.DoesNotExist:
        print("Chatroom does not exist, cannot delete.")