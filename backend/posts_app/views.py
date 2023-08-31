from django.shortcuts import render
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_201_CREATED, HTTP_404_NOT_FOUND
from rest_framework.response import Response
from .models import Posts 
from forum_topics_app.models import ForumTopics
from .serializer import PostsSerializer
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class All_posts(APIView):
    def get(self, request, forum_id):
        forum = get_object_or_404(ForumTopics, id=forum_id)
        posts = PostsSerializer(Posts.objects.filter(topic_id=forum))
        return Response(posts.data, status=HTTP_200_OK)
    
    def post(self, request, forum_id):
        forum = get_object_or_404(ForumTopics, id=forum_id)
        posts = Posts(**request.data, topic_id=forum)
        posts.save 
        posts = PostsSerializer(posts)
        return Response(posts.data, status=HTTP_201_CREATED)

#need add in user authorization for these 
class Select_posts(APIView):
    def get(self, request, forum_id, post_id):
        select_post = get_object_or_404(Posts, id=post_id, topic_id=forum_id)
        select_post = PostsSerializer(select_post)
        return Response(select_post.data, status=HTTP_200_OK)
    
    def put(self, request, forum_id, post_id):
        post = get_object_or_404(Posts, id=post_id, topic_id=forum_id)
        if 'content' in request.data:
            post.content = request.data.get('content')        
        if 'edited' in request.data:
            post.content = request.data.get('edited')
        if 'title' in request.data:
            post.title = request.data.get('title')
        if 'reaction' in request.data:
            post.reaction = request.data.get('reaction')
        post.full_clean() 
        post.save()

        return Response("Post was updated.", HTTP_201_CREATED)
    
    def delete(self, request, forum_id, post_id):
        post = get_object_or_404(Posts, id=post_id, topic_id=forum_id)
        post.delete() 
        return Response(status=HTTP_204_NO_CONTENT)