from django.urls import path
from .views import All_comments, A_comment, ReactionUpdate

urlpatterns =[
    path('post/<int:post_ID>/', All_comments.as_view()),
    path('comment/<int:comment_id>/', A_comment.as_view()),
    path('comment/update/<int:comment_id>/', ReactionUpdate.as_view()),
]