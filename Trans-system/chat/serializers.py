from rest_framework import serializers
from .models import Message
from django.contrib.auth import get_user_model

User = get_user_model()


class UserMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class MessageSerializer(serializers.ModelSerializer):
    expediteur = UserMiniSerializer(read_only=True)
    destinataire = UserMiniSerializer(read_only=True)

    destinataireId = serializers.IntegerField(write_only=True)

    class Meta:
        model = Message
        fields = [
            'id',
            'expediteur',
            'destinataire',
            'destinataireId',
            'contenu',
            'date'
        ]

    def validate_destinataireId(self, value):
        request = self.context['request']
        user = request.user

        # Vérifier que le destinataire existe
        try:
            destinataire = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Utilisateur destinataire inexistant")

        # 🔒 RÈGLE MÉTIER
        if not user.is_staff:
            # Client → doit parler UNIQUEMENT à un admin
            if not destinataire.is_staff:
                raise serializers.ValidationError(
                    "Vous ne pouvez discuter qu’avec l’administrateur"
                )

        return value

    def create(self, validated_data):
        destinataire_id = validated_data.pop('destinataireId')
        destinataire = User.objects.get(id=destinataire_id)

        return Message.objects.create(
            destinataire=destinataire,
            **validated_data
        )
