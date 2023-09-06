from django.urls import path
from .views import All_forums, SearchForums

urlpatterns = [
    path("", All_forums.as_view()),
    path("", SearchForums.as_view())
]