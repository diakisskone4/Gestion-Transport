from django.contrib import admin
from django.urls import include, path
from users.views import LoginView, RegisterView, MeView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ======================
    # AUTHENTIFICATION
    # ======================
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/me/', MeView.as_view(), name='me'),

    # ======================
    # API APPS
    # ======================
    path('api/admin/', include('dashboard.urls')),
    path('api/trajets/', include('transports.urls')),
    path('api/reservations/', include('reservations.urls')),
    path('api/paiements/', include('paiements.urls')),
]
