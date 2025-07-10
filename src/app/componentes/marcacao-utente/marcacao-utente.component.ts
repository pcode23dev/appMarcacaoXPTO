import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcacao-utente',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Nova Marcação - Utente</h1>
      <p>Componente em desenvolvimento...</p>
    </div>
  `,
  styles: [`
    .container { padding: 40px; text-align: center; }
    h1 { color: #667eea; }
  `]
})
export class MarcacaoUtenteComponent {}