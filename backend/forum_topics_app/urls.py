from django.urls import path
from .views import All_forums, SearchForums

urlpatterns = [
    path("", All_forums.as_view()),
    path("<str:search>", SearchForums.as_view())
]