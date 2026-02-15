from django.urls import path
from .views import TripListCreateView, CarListCreateView

urlpatterns = [
    path('trajets/', TripListCreateView.as_view(), name='trip-list'),
    path('cars/', CarListCreateView.as_view(), name='car-list'),
]
