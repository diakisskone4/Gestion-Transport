import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Redirection automatique si déjà connecté
    const user = this.auth.user();
    if (user) {
      if (user.user.is_staff) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/client']);
      }
    }
  }

  login() {
    this.loading = true;
    this.error = '';

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: auth => {
        this.loading = false;
        if (auth.user.is_staff) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Identifiants incorrects';
      }
    });
  }
}
