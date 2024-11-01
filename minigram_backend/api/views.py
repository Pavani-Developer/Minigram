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

@api_view(['POST'])
def update_profile(request):
    user_id = request.data.get('user_id')
    bio = request.data.get('bio')
    image = request.FILES.get('image')  # Use FILES to access uploaded image

    try:
        user_profile = UserProfiles.objects.get(user_id=user_id)
        if bio is not None:
            user_profile.bio = bio
        if image is not None:
            user_profile.image = image
        user_profile.save()

        return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
    except UserProfiles.DoesNotExist:
        return Response({"error": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def user_data(request, id):
    try:
        # Use select_related to fetch the UserProfile along with User in a single query
        user_profile = UserProfiles.objects.select_related('user').get(user__id=id)
        
        # Serialize the user profile data
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
    except UserProfiles.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=404)