import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-client-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  user: any = null;
  loading = true;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.loading = true;
    this.auth.me().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateur:', err);
        this.error = 'Impossible de charger vos informations. Veuillez vous reconnecter.';
        this.loading = false;
        setTimeout(() => {
          this.auth.logout();
          this.router.navigate(['/login']);
        }, 3000);
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}