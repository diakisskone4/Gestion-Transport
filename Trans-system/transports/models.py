from django.db import models

class Car(models.Model):
    number = models.CharField(max_length=50, unique=True)  # numéro unique (ex: immatriculation)
    seats = models.PositiveIntegerField()  # nombre de sièges

    def __str__(self):
        return f"{self.number} ({self.seats} places)"


class Trip(models.Model):
    departure = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.DateTimeField()  # heure précise du départ
    price = models.DecimalField(max_digits=10, decimal_places=2)
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name="trips")

    def __str__(self):
        return f"{self.departure} → {self.destination} ({self.price} €)"
