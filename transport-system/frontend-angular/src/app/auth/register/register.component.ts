import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  error = '';
  loading = false;
  acceptTerms = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // Validation du mot de passe
  get hasMinLength(): boolean {
    return this.password.length >= 8;
  }

  get hasUpperCase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  get hasLowerCase(): boolean {
    return /[a-z]/.test(this.password);
  }

  get hasNumber(): boolean {
    return /[0-9]/.test(this.password);
  }

  // Validation du formulaire
  isFormValid(): boolean {
    return this.username.trim() !== '' &&
           this.hasMinLength &&
           this.hasUpperCase &&
           this.hasLowerCase &&
           this.hasNumber &&
           this.acceptTerms;
  }

  register() {
    if (!this.isFormValid()) {
      this.error = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.loading = true;
    this.error = '';

    this.auth.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'success' }
        });
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 400) {
          this.error = 'Ce nom d\'utilisateur est déjà pris';
        } else {
          this.error = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        }
        console.error('Erreur d\'inscription:', err);
      }
    });
  }
}