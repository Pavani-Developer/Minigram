from django.db import models

# Create your models here.

class RegisterUser(models.Model):
    email = models.EmailField()
    username= models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    confirm_password = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
# class User(models.Model):
#     registration = models.OneToOneField(User, on_delete=models.CASCADE)
#     first_name = models.CharField(max_length=50, blank=True)
#     last_name = models.CharField(max_length=50, blank=True)
#     bio = models.TextField(blank=True)
#     image = models.ImageField(upload_to='profiles/', blank=True)

#     def __str__(self):
#         return self.registration.username
    
