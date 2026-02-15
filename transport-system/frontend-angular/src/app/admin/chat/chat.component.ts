import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, Client } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-admin-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class AdminChatComponent implements OnInit {

  messages: any[] = [];
  contenu = '';

  // ✅ Client sélectionné dans la liste
  selectedClientId!: number;

  // ✅ Liste des clients (id + username)
  clients: Client[] = [];

  // utilisateur connecté (admin)
  myId = computed(() => this.auth.user()?.user.id);

  constructor(
    private chat: ChatService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // 🔽 Charger les clients par NOM
  loadClients() {
    this.chat.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  // 💬 Charger la conversation
  load() {
    if (!this.selectedClientId) return;

    this.chat.getConversation(this.selectedClientId)
      .subscribe(data => this.messages = data);
  }

  // ✉️ Envoyer un message
  envoyer() {
    if (!this.contenu.trim() || !this.selectedClientId) return;

    this.chat.envoyer({
      contenu: this.contenu,
      destinataireId: this.selectedClientId
    }).subscribe(() => {
      this.contenu = '';
      this.load();
    });
  }

  // ↔️ Alignement message
  isSent(m: any): boolean {
    return m.expediteur?.id === this.myId();
  }
}
