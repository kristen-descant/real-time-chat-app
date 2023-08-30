

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import User
from .serializers import  UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializers import UserProfileSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializers = UserSerializerWithToken(self.user).data
        for k, v in serializers.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    
    data = request.data
    
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    
    if data['paswword'] != '':
        user.password = make_password(data['password'])
    user.save()
    
    return Response(serializer.data)


@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

class UserProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.display_name = request.data.get('display_name', user.display_name)
        user.profile_picture = request.data.get('profile_picture', user.profile_picture)
        friends = request.data.get('friends')
        if friends:
            for friend_id in friends:
                try:
                    friend = User.objects.get(pk=friend_id)
                    user.friends.add(friend)
                except User.DoesNotExist:
                    pass
        user.save()
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    '''
    

 The `UserProfileRetrieveUpdateView` is a view that allows retrieving and updating specific fields (i.e., `display_name`, `profile_picture`, and `friends`) of a `User` object based on its primary key (`pk`).
 In the `update` method, the `User`'s details are updated from the provided data; if a list of `friends` is provided, the system tries to add each friend to the user's friends list by their IDs.
 After updating, the `User`'s modified profile is serialized using the `UserProfileSerializer` and sent back as a response with a `200 OK` status.
    
    
    
    '''
