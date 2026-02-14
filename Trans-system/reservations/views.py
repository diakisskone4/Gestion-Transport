from rest_framework.generics import ListCreateAPIView
from .models import Reservation
from .serializers import ReservationSerializer

class ReservationListCreateView(ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
