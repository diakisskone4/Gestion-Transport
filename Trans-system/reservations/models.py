from django.db import models
from django.conf import settings
from transports.models import Trip


class Reservation(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='reservations'
    )
    seat_number = models.PositiveIntegerField()  # ✅ jamais négatif
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.trip} ({self.seat_number} places)"