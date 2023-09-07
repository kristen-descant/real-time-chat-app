from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT, HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from django.db.models import Q

from .models import User
from .serializers import UserSerializer, UserSerializerWithToken  

class Sign_up(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = User.objects.create_user(email=request.data["email"],
                                        password=request.data["password"],
                                        display_name=request.data["display_name"],
                                        )
        token = Token.objects.create(user=user)
        return Response({"user": user.email, "token": token.key}, status=HTTP_201_CREATED)


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.email})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})



@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
       
        if not all(field in data for field in ['email', 'password', 'display_name']):
            raise ValueError("Required fields are missing")

        user = User.objects.create_user(
            email=data['email'],
            password=make_password(data['password']),
            display_name=data['display_name']
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=HTTP_201_CREATED)

    except Exception as e:
        message = {'detail': str(e)}
        return Response(message, status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_friend(request,id):
    # Get the current user
    current_user = request.user

    # Extract friend_id from the request data (assuming it's sent in the request body)
    friend_id = id

    try:
        # Get the user to be added as a friend
        friend = User.objects.get(id=friend_id)

        # Add the friend to the current user's friends list
        current_user.friends.add(friend)

        return Response(status=HTTP_200_OK)
    except User.DoesNotExist:
        # Handle the case where the specified friend_id does not exist
        return Response({'error': 'User not found'}, status=HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_friend(request,id):
    # Get the current user
    current_user = request.user

    # Extract friend_id from the request data (assuming it's sent in the request body)
    friend_id = id

    try:
        # Get the user to be added as a friend
        friend = User.objects.get(id=friend_id)

        # Add the friend to the current user's friends list
        current_user.friends.remove(friend)

        return Response(status=HTTP_200_OK)
    except User.DoesNotExist:
        # Handle the case where the specified friend_id does not exist
        return Response({'error': 'User not found'}, status=HTTP_404_NOT_FOUND)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile(request):  
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_profile_by_id(request,id):
    user = User.objects.get(id=id)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    data = request.data
    user.first_name = data.get('first_name', user.first_name)
    user.display_name = data.get('display_name', user.display_name)
    user.profile_name = data.get('profile_name', user.profile_name)
    if data.get('password'):
        user.set_password(data['password'])
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=HTTP_200_OK)

class SearchUsers(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, search):
        # Searching users by either email or display_name
        users = User.objects.filter(Q(email__icontains=search) | Q(display_name__icontains=search))

        if not users.exists():
            return Response({"message": "No users found"}, status=HTTP_404_NOT_FOUND)

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=HTTP_200_OK)


