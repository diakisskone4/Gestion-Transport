from django.db import models
from apps.companies.models import Company

class Driver(models.Model):
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    license_number = models.CharField(max_length=100)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.full_name


class Vehicle(models.Model):
    VEHICLE_TYPE = (
        ('BUS', 'Bus'),
        ('MINIBUS', 'Minibus'),
        ('SOTRAMA', 'Sotrama'),
        ('TAXI', 'Taxi'),
    )

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    plate_number = models.CharField(max_length=50, unique=True)
    capacity = models.PositiveIntegerField()
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.plate_number
