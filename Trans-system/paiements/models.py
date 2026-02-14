from django.db import models
from reservations.models import Reservation

class Paiement(models.Model):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=10, decimal_places=2)
    date_paiement = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=50, default='payé')

    def __str__(self):
        return f"Paiement {self.id}"
