from django.urls import path
from .views import All_posts, Select_posts, React
urlpatterns = [
    path("<int:forum_id>/posts/", All_posts.as_view()),
    path("<int:forum_id>/posts/<int:post_id>/", Select_posts.as_view()),
    path("<int:forum_id>/post/<int:post_id>/", React.as_view())
]