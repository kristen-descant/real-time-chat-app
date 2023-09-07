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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, forum_id):
        forum = get_object_or_404(ForumTopics, id=forum_id)
        posts = PostsSerializer(Posts.objects.filter(topic_id=forum), many=True)
        return Response(posts.data, status=HTTP_200_OK)
    
    def post(self, request, forum_id):
        forum = get_object_or_404(ForumTopics, id=forum_id)
        posts = Posts(**request.data, topic_id=forum, created_by_id=request.user.id)
        posts.save()  
        posts = PostsSerializer(posts)
        return Response(posts.data, status=HTTP_201_CREATED)

#need add in user authorization for these 
class Select_posts(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, forum_id, post_id):
        select_post = get_object_or_404(Posts, id=post_id, topic_id=forum_id)
        select_post = PostsSerializer(select_post)
        return Response(select_post.data, status=HTTP_200_OK)
    
    def put(self, request, forum_id, post_id):
        post = get_object_or_404(Posts, id=post_id, topic_id=forum_id, created_by=request.user.id)
        if 'content' in request.data:
            post.content = request.data.get('content')        
        if 'edited' in request.data:
            post.content = request.data.get('edited')
        if 'title' in request.data:
            post.title = request.data.get('title')
        if 'up' in request.data:
            # print(request.data.get('up'), post.up)
            if not str(request.data.get('up')) in post.up:
                # print("stop")
                post.up.append(request.data.get('up'))
            else:
                post.up.remove(str(request.data.get('up')))
        if 'down' in request.data:
            if not str(request.data.get('down')) in post.down:
                post.down.append(request.data.get('down'))
            else:
                post.down.remove(str(request.data.get('down')))
        post.full_clean() 
        post.save()

        return Response("Post was updated.", HTTP_201_CREATED)
    
    def delete(self, request, forum_id, post_id):
        post = get_object_or_404(Posts, id=post_id, topic_id=forum_id, created_by=request.user.id)
        post.delete() 
        return Response(status=HTTP_204_NO_CONTENT)