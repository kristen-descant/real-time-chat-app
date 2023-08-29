from rest_framework import serializers
from .models import Comments 

class CommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments 
        fields = ['id', 'content', 'created_by', 'post_id', 'edited', 'date_created', 'reaction']