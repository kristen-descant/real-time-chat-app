from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import Comments, CommentsSerializer
from posts_app.models import Posts
# Add authentication methods here
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
# Create your views here.

class All_comments(APIView):
    def get(self, request, post_ID):
        post = get_object_or_404(Posts, id=post_ID)
        comments = CommentsSerializer(Comments.objects.filter(post_id=post), many=True)
        return Response(comments.data, status=HTTP_200_OK)
    
    def post(self, request, post_ID):
        post = get_object_or_404(Posts, id=post_ID)
        comment = Comments(**request.data, post_id=post)
        comment.save()
        comment = CommentsSerializer(comment)
        return Response(comment.data, status=HTTP_201_CREATED)
    
class A_comment(APIView):
    def get(self, request, comment_id):
        comment = get_object_or_404(Comments, id=comment_id)
        comment = CommentsSerializer(comment)
        return Response(comment.data, status=HTTP_200_OK)
    
    def put(self,request, comment_id):
        comment = get_object_or_404(Comments, id=comment_id)
        new_content = request.data.get("content")
        new_reaction = request.data.get("reaction")
        if new_content != comment.content:
            comment.content = new_content
            comment.edited = True
        if new_reaction != comment.reaction:
            comment.reaction = new_reaction
        comment.full_clean()
        comment.save()
        return Response("Comment Updated", HTTP_200_OK)

    def delete(self,request,comment_id):
        comment = get_object_or_404(Comments, id=comment_id)
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    