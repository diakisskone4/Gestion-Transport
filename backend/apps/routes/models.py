from django.db import models
from apps.companies.models import Company
from apps.vehicles.models import Vehicle

class Route(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.origin} → {self.destination}"


class Schedule(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    departure_time = models.DateTimeField()
    available_seats = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.route} - {self.departure_time}"
