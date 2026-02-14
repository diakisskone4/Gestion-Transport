from django.db import models
from django.conf import settings
from transports.models import Trip

class Reservation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    seat_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
