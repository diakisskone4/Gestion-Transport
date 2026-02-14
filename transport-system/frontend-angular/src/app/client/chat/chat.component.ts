import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-client-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html'
})
export class ClientChatComponent implements OnInit {

  messages: any[] = [];
  contenu = '';
  adminId = 1;

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.chat.getConversation(this.adminId)
      .subscribe(data => this.messages = data);
  }

  envoyer() {
    this.chat.envoyer({ contenu: this.contenu, destinataireId: this.adminId })
      .subscribe(() => {
        this.contenu = '';
        this.load();
      });
  }
}
