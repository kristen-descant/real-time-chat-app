from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import User


class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 'email', 'display_name', 'profile_picture', 
             'last_login', 'date_joined', 'is_active', 'is_staff'
        ]

class UserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'display_name', 'profile_picture', 
            'friends', 'last_login', 'date_joined', 'is_active', 'is_staff'
        ]
    

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'display_name', 'profile_picture', 
            'friends', 'last_login', 'date_joined', 'is_active', 'is_staff', 'token'
        ]

    def get_token(self, obj):
        token, created = Token.objects.get_or_create(user=obj)
        return token.key
