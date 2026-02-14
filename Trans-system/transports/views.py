from rest_framework.generics import ListCreateAPIView
from .models import Trip
from .serializers import TripSerializer

class TripListCreateView(ListCreateAPIView):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
