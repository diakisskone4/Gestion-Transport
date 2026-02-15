from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth import get_user_model
from .models import Message
from .serializers import MessageSerializer

User = get_user_model()


class ConversationView(ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        other_id = self.kwargs['user_id']

        # 🔒 Client : uniquement sa conversation avec l’admin
        if not user.is_staff:
            return Message.objects.filter(
                Q(expediteur=user, destinataire__is_staff=True) |
                Q(expediteur__is_staff=True, destinataire=user)
            ).order_by('date')

        # 🔓 Admin : conversation avec le client sélectionné
        return Message.objects.filter(
            Q(expediteur=user, destinataire_id=other_id) |
            Q(expediteur_id=other_id, destinataire=user)
        ).order_by('date')


class MessageCreateView(CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(expediteur=self.request.user)


# ✅ NOUVEL ENDPOINT : liste des clients
class ClientListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # uniquement les clients (non staff)
        clients = User.objects.filter(is_staff=False).values('id', 'username')
        return Response(clients)
