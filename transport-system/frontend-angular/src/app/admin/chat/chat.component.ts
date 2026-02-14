import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-chat',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html'
})
export class AdminChatComponent {

  messages: any[] = [];
  contenu = '';
  userId!: number;

  constructor(private chat: ChatService) {}

  load() {
    this.chat.getConversation(this.userId)
      .subscribe(data => this.messages = data);
  }

  envoyer() {
    this.chat.envoyer({ contenu: this.contenu, destinataireId: this.userId })
      .subscribe(() => {
        this.contenu = '';
        this.load();
      });
  }
}
