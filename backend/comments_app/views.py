from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import Comments, CommentsSerializer
from posts_app.models import Posts
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
# Create your views here.

class All_comments(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, post_ID):
        post = get_object_or_404(Posts, id=post_ID)
        comments = CommentsSerializer(Comments.objects.filter(post_id=post), many=True)
        return Response(comments.data, status=HTTP_200_OK)
    
    def post(self, request, post_ID):
        post = get_object_or_404(Posts, id=post_ID)
        comment = Comments(**request.data, post_id=post, created_by_id=request.user.id)
        comment.save()
        comment = CommentsSerializer(comment)
        return Response(comment.data, status=HTTP_201_CREATED)
    
class A_comment(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, comment_id):
        comment = get_object_or_404(Comments, id=comment_id)
        comment = CommentsSerializer(comment)
        return Response(comment.data, status=HTTP_200_OK)
    
    def put(self,request, comment_id):
        comment = get_object_or_404(Comments, id=comment_id, created_by=request.user.id)
        if "content" in request.data:
            new_content = request.data.get("content")
            if new_content != comment.content:
                comment.content = new_content
                comment.edited = True
            comment.full_clean()
            comment.save()
            return Response("Comment Updated", HTTP_200_OK)
        if "up" in request.data:
            if request.data.get("up") == "update":
                if request.user.id not in comment.up:
                    comment.up.append(request.user.id)
                    comment.full_clean()
                    comment.save()
                else:
                    comment.up.remove(request.user.id)
                    comment.full_clean()
                    comment.save()
                return Response("Up Votes has been updated")
            # if request.data.get("up") == "sub":
            #     if request.user.id not in comment.down:
            #         comment.down.append(request.user.id)
            #     else:
            #         comment.down.remove(request.user.id)
            #     return Response("Up Votes has been updated")
        if "down" in request.data:
            if request.data.get("down") == "update":
                if request.user.id not in comment.down:
                    comment.down.append(request.user.id)
                    comment.full_clean()
                    comment.save()
                else:
                    comment.down.remove(request.user.id)
                    comment.full_clean()
                    comment.save()
                return Response("Down Vote has been updated", status=HTTP_200_OK)

    def delete(self,request,comment_id):
        comment = get_object_or_404(Comments, id=comment_id)
        comment.delete()
        return Response(status=HTTP_204_NO_CONTENT)
