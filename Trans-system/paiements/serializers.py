from rest_framework import serializers
from reservations.models import Reservation
from .models import Paiement


class PaiementSerializer(serializers.ModelSerializer):
    # 🔑 Champ utilisé UNIQUEMENT pour l’écriture (POST)
    reservation_id = serializers.PrimaryKeyRelatedField(
        queryset=Reservation.objects.all(),
        source='reservation',
        write_only=True
    )

    class Meta:
        model = Paiement
        fields = [
            'id',
            'reservation',      # lecture (GET)
            'reservation_id',   # écriture (POST)
            'montant',
            'date_paiement',
            'statut'
        ]
        read_only_fields = [
            'id',
            'reservation',
            'montant',
            'date_paiement',
            'statut'
        ]

    def create(self, validated_data):
        reservation = validated_data['reservation']

        # ❌ Bloquer le double paiement
        if hasattr(reservation, 'paiement'):
            raise serializers.ValidationError(
                "Cette réservation a déjà été payée."
            )

        # ✅ Calcul automatique du montant (ANTI-FRAUDE)
        montant = reservation.seat_number * reservation.trip.price

        return Paiement.objects.create(
            reservation=reservation,
            montant=montant,
            statut='PAYE'
        )