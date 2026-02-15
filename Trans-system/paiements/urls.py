from django.urls import path
from .views import PaiementListCreateView, PaiementByReservationView

urlpatterns = [
    path('', PaiementListCreateView.as_view(), name='paiement-list'),
    path(
        'reservation/<int:reservation_id>/',
        PaiementByReservationView.as_view(),
        name='paiement-by-reservation'
    ),
]
