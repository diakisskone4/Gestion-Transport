from rest_framework import serializers
from .models import Car, Trip

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class TripSerializer(serializers.ModelSerializer):
    # Inclure les infos de la voiture en lecture seule
    car = CarSerializer(read_only=True)
    # Permettre la création via l'ID de la voiture
    car_id = serializers.PrimaryKeyRelatedField(
        queryset=Car.objects.all(), source='car', write_only=True
    )

    class Meta:
        model = Trip
        fields = ['id', 'departure', 'destination', 'departure_time', 'price', 'car', 'car_id']
