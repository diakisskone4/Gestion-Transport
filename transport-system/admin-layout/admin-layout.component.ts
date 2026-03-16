import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  // Propriété pour gérer l'état de la sidebar (ouverte/fermée)
  isSidebarCollapsed = false;

  // Méthode pour basculer l'état de la sidebar
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}