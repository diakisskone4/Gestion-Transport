from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Reservation
from .serializers import ReservationSerializer

# ======================
# ADMIN : toutes les réservations
# ======================
class ReservationListAdminView(ListAPIView):
    queryset = Reservation.objects.select_related('user', 'trip').all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminUser]


# ======================
# CLIENT : mes réservations
# ======================
class MesReservationsView(ListAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Reservation.objects.filter(user=self.request.user)


# ======================
# CLIENT : créer une réservation
# ======================
class ReservationCreateView(CreateAPIView):
    serializer_class = ReservationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
