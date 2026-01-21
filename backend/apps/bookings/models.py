from django.db import models
from apps.accounts.models import User
from apps.routes.models import Schedule

class Booking(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'En attente'),
        ('PAID', 'Payé'),
        ('CANCELLED', 'Annulé'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)
    seats = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user}"
