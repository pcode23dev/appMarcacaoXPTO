import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UtenteService } from '../../services/utente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private utenteService: UtenteService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { email, senha } = this.loginForm.value;

      this.utenteService.login(email, senha).subscribe({
        next: (user) => {
          this.isLoading = false;
          if (user) {
            // Redirecionar baseado no role do usuário
            switch (user.role) {
              case 'utente':
                this.router.navigate(['/historico']);
                break;
              case 'administrativo':
                this.router.navigate(['/administracao']);
                break;
              case 'admin':
                this.router.navigate(['/gestao-utentes']);
                break;
              default:
                this.router.navigate(['/']);
            }
          } else {
            this.errorMessage = 'Email ou senha incorretos.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
          console.error('Erro no login:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName === 'email' ? 'Email' : 'Senha'} é obrigatório.`;
      }
      if (control.errors['email']) {
        return 'Email inválido.';
      }
      if (control.errors['minlength']) {
        return 'Senha deve ter pelo menos 3 caracteres.';
      }
    }
    return '';
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}