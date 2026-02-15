from django.conf import settings
from django.db import models

class Message(models.Model):
    expediteur = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='messages_envoyes',
        on_delete=models.CASCADE
    )
    destinataire = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='messages_recus',
        on_delete=models.CASCADE
    )
    contenu = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.expediteur} -> {self.destinataire}"
