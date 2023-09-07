# chat/urls.py
from django.urls import path
from .views import Get_Chat_Rooms, Delete_Chat_Room
from . import views


urlpatterns = [
    # path("", views.index, name="index"),
    # path("<str:room_name>/", views.room, name="room"),
    path("<str:room_name>/messages/", views.updated_message_db, name="first_50"),
    path("<str:room_name>/messages/<int:oldest_message>", views.updated_message_db, name="message_history"),
    path("", Get_Chat_Rooms),
    path("", Delete_Chat_Room)
]