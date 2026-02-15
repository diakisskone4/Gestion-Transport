from rest_framework import serializers
from .models import Reservation
from transports.serializers import TripSerializer

class ReservationSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    trip_id = serializers.PrimaryKeyRelatedField(
        queryset=Reservation._meta.get_field('trip').remote_field.model.objects.all(),
        source='trip',
        write_only=True
    )

    class Meta:
        model = Reservation
        fields = ['id', 'trip', 'trip_id', 'seat_number', 'created_at']
        read_only_fields = ['id', 'created_at']
