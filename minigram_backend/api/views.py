from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from . models import *

from .serializers import *
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated




# Create your views here.
@api_view(['POST'])
def registerView(request):
    email = request.data['email']
    username = request.data['username']
    password = request.data['password']
    confirm_password = request.data['confirmPassword']
    
    if password != confirm_password:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username, email, password)
    user.save()
    
    return Response({"success": "User registered successfully"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])  
def getuserView(request,username):
    """
    Returns a single user's information in JSON format based on the provided username.

    Args:
        request (Request): The request object
        username (str): The username of the user to retrieve

    Returns:
        Response: A JSON response containing the user's information
    """
    # Retrieve the user from the database
    user = User.objects.get(username=username)

    # Serialize the user into a JSON format
    serializer = UserSerializer(user, many=False)

    # Get the serialized data
    serializer = UserSerializer(User.objects.get(username=username), many=False)
    users = serializer.data

    # Return a JSON response with the user's information
    return Response({"user": users})


    
@api_view(['GET'])
def user_data(request, userid):
    user =  UserProfiles.objects.get(userid=userid)
    serializer = UserProfileSerializer(user,many=True)
    return Response(serializer.data)