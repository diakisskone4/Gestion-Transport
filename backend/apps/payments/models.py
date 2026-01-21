from django.db import models
from apps.bookings.models import Booking

class Transaction(models.Model):
    PAYMENT_METHODS = (
        ('ORANGE_MONEY', 'Orange Money'),
        ('CARD', 'Carte Bancaire'),
    )

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    reference = models.CharField(max_length=255, unique=True)
    is_successful = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.reference
