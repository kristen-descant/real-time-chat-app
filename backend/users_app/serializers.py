from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User

class FriendlessUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'display_name', 'profile_picture', 
            'last_login', 'date_joined', 'is_active'
        ]

class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'email', 'display_name', 'profile_picture','friends', 
            'last_login', 'date_joined', 'is_active', 'is_staff'
        ]

    def get_friends(self, obj):
        # Assuming you have a related name 'friends' on the User model
        friends = obj.friends.all()
        return FriendlessUserSerializer(friends, many=True).data

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'display_name', 'profile_name', 'profile_picture', 
            'friends', 'last_login', 'date_joined', 'is_active', 'is_staff', 'token'
        ]

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key
