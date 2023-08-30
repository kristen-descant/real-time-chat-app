from django.urls import path
from .views import All_forums

urlpatterns = [
    path("", All_forums.as_view())
]