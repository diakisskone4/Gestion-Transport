from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from django.db.models import Sum

from transports.models import Trip
from reservations.models import Reservation
from paiements.models import Paiement
from transports.models import Trip



@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    return Response({
        "trajets": Trip.objects.count(),
        "reservations": Reservation.objects.count(),
        "paiements": Paiement.objects.count(),
        "total_montant": Paiement.objects.aggregate(Sum('montant'))['montant__sum'] or 0,
    })
