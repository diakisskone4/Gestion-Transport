from django.urls import path
from .consumers import PrivateChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room>/', PrivateChatConsumer.as_asgi()),
]
