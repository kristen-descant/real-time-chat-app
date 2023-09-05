# chat/urls.py
from django.urls import path

from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("<str:room_name>/", views.room, name="room"),
    path("<str:room_name>/messages/", views.updated_message_db, name="first_50"),
    path("<str:room_name>/messages/<int:oldest_message>", views.updated_message_db, name="message_history"),
]