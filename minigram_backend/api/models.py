from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class RegisterUser(models.Model):
    email = models.EmailField()
    username= models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    confirm_password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    

