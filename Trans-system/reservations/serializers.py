from rest_framework import serializers
from .models import Reservation
from transports.models import Trip
from transports.serializers import TripSerializer


class ReservationSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)

    trip_id = serializers.PrimaryKeyRelatedField(
        queryset=Trip.objects.all(),   # ✅ SIMPLE ET PROPRE
        source='trip',
        write_only=True
    )

    class Meta:
        model = Reservation
        fields = [
            'id',
            'trip',
            'trip_id',
            'seat_number',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    # ✅ VALIDATION METIER
    def validate_seat_number(self, value):
        if value < 1:
            raise serializers.ValidationError(
                "Le nombre de places doit être supérieur à 0."
            )
        return value