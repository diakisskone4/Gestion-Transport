from django.urls import path
from .views import (
    PaiementListCreateView,
    PaiementByReservationView,
    AdminPaiementListView
)

urlpatterns = [
    # CLIENT
    path(
        '',
        PaiementListCreateView.as_view(),
        name='paiement-client'
    ),

    # ADMIN
    path(
        'admin/',
        AdminPaiementListView.as_view(),
        name='paiement-admin'
    ),

    # CLIENT : par réservation
    path(
        'reservation/<int:reservation_id>/',
        PaiementByReservationView.as_view(),
        name='paiement-by-reservation'
    ),
]