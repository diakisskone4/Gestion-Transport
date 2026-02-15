from django.urls import path
from .views import ConversationView, MessageCreateView, ClientListView

urlpatterns = [
    path('', MessageCreateView.as_view()),
    path('clients/', ClientListView.as_view()),      # ✅ AJOUT
    path('<int:user_id>/', ConversationView.as_view()),
]
