from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .models import ForumTopics
from .serializer import ForumTopicsSerializer
from django.db.models import Q
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class All_forums(APIView):
    def get(self, request):
        forums = ForumTopicsSerializer(ForumTopics.objects.all(), many=True)
        return Response(forums.data, status=HTTP_200_OK)

    def post (self, request):
        new_forum_topic = ForumTopics(**request.data) 
        new_forum_topic.full_clean()
        new_forum_topic.save()
        new_forum_topic = ForumTopicsSerializer(new_forum_topic)
        return Response(new_forum_topic.data, HTTP_201_CREATED)
    
class SearchForums(APIView):

    def get(self, request, search):
        forums = ForumTopics.objects.filter(title__icontains=search)
        
        if not forums.exists():
            return Response({"message": "No forums found"}, status=HTTP_404_NOT_FOUND)
        
        serializer = ForumTopicsSerializer(forums, many=True)
        return Response(serializer.data, status=HTTP_200_OK)