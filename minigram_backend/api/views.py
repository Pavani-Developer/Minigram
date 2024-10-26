from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from . models import *
from .serializers import *
from django.contrib.auth.models import User



# Create your views here.
@api_view(['POST'])
def registerView(request):
    email = request.data['email']
    username = request.data['username']
    password = request.data['password']
    confirm_password = request.data['confirmPassword']
    
    if password != confirm_password:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)
    
    user = RegisterUser.objects.create_user(username, email, password)
    user.save()
    
    return Response({"success": "User registered successfully"}, status=status.HTTP_201_CREATED)
    
@api_view(['GET'])  
def getuserView(request,username):
    serializer = UserSerializer(User.objects.get(username=username), many=False)
    users = serializer.data
    return Response({"user": users})