from django.urls import path
from .views import PaiementListCreateView

urlpatterns = [
    path('', PaiementListCreateView.as_view(), name='paiement-list'),
]
