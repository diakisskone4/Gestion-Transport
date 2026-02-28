from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from .models import Paiement
from .serializers import PaiementSerializer


# ======================
# CLIENT : créer / voir SES paiements
# ======================
class PaiementListCreateView(ListCreateAPIView):
    serializer_class = PaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Paiement.objects.filter(
            reservation__user=self.request.user
        )


# ======================
# ADMIN : voir TOUS les paiements
# ======================
class AdminPaiementListView(ListCreateAPIView):
    serializer_class = PaiementSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return Paiement.objects.all()


# ======================
# CLIENT : paiement par réservation
# ======================
class PaiementByReservationView(RetrieveAPIView):
    serializer_class = PaiementSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        reservation_id = self.kwargs['reservation_id']

        return get_object_or_404(
            Paiement,
            reservation_id=reservation_id,
            reservation__user=self.request.user
        )