import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nao-autorizado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1>Acesso Não Autorizado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <a routerLink="/" class="btn">Voltar ao Início</a>
    </div>
  `,
  styles: [`
    .container { 
      padding: 40px; 
      text-align: center; 
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    h1 { color: #e74c3c; margin-bottom: 20px; }
    p { color: #666; margin-bottom: 30px; }
    .btn {
      background: #667eea;
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s ease;
    }
    .btn:hover { transform: translateY(-2px); }
  `]
})
export class NaoAutorizadoComponent {}