from rest_framework.generics import ListCreateAPIView
from .models import Paiement
from .serializers import PaiementSerializer

class PaiementListCreateView(ListCreateAPIView):
    queryset = Paiement.objects.all()
    serializer_class = PaiementSerializer
