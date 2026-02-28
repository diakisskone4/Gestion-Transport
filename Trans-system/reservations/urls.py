from django.urls import path
from .views import (
    ReservationListAdminView,
    MesReservationsView,
    ReservationCreateView,
    ReservationDetailView
)

urlpatterns = [
    # ======================
    # ADMIN : toutes les réservations
    # ======================
    path('', ReservationListAdminView.as_view(), name='admin-reservations'),

    # ======================
    # CLIENT : mes réservations
    # ======================
    path('mes/', MesReservationsView.as_view(), name='mes-reservations'),

    # ======================
    # CLIENT : créer une réservation
    # ======================
    path('create/', ReservationCreateView.as_view(), name='reservation-create'),

    # ======================
    # 🔥 CLIENT : détail réservation (OBLIGATOIRE)
    # ======================
    path('<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
]