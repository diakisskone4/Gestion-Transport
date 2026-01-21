from django.db import models
from apps.accounts.models import User

class Company(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='companies/', blank=True, null=True)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    address = models.TextField()
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class CompanyUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user} - {self.company}"
