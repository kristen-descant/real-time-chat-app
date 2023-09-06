from rest_framework import serializers
from comments_app.serializer import CommentsSerializer
from .models import Posts

class PostsSerializer(serializers.ModelSerializer):
    comments = CommentsSerializer(many=True)
    class Meta:
        model = Posts 
        fields = ['id', 'content','created_by', 'topic_id', 'edited', 'date_created', 'title', 'up', 'down', 'comments']