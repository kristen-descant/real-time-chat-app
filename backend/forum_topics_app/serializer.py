from rest_framework import serializers
from posts_app.serializer import PostsSerializer
from .models import ForumTopics

class ForumTopicsSerializer(serializers.ModelSerializer):
    posts = PostsSerializer(many=True)
    class Meta:
        model = ForumTopics
        fields = ["id", "title", 'rating', "posts"]