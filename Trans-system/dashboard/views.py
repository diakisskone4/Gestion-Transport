from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.db.models import Sum

from chat.models import Message


class AdminDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not user.is_staff:
            raise PermissionDenied("Accès réservé à l’administrateur")

        data = {
            "trajets": 0,
            "reservations": 0,
            "paiements": 0,
            "total_montant": 0,
            "messages": Message.objects.count(),
        }

        return Response(data)
