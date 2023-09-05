from rest_framework import serializers
from .models import Comments 

class CommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments 
        fields = ['id', 'content', 'post_id', 'edited', 'date_created', 'up', 'down']