from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from .models import Paiement
from .serializers import PaiementSerializer

class PaiementListCreateView(ListCreateAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer


class PaiementByReservationView(RetrieveAPIView):
    serializer_class = PaiementSerializer

    def get_object(self):
        reservation_id = self.kwargs['reservation_id']
        return get_object_or_404(Paiement, reservation_id=reservation_id)
