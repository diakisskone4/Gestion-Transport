from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('SUPER_ADMIN', 'Super Admin'),
        ('COMPANY_ADMIN', 'Admin Société'),
        ('AGENT', 'Agent'),
        ('USER', 'Utilisateur'),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='USER'
    )
    phone = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
