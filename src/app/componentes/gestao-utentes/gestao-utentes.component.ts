import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestao-utentes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Gestão de Utentes</h1>
      <p>Componente em desenvolvimento...</p>
    </div>
  `,
  styles: [`
    .container { padding: 40px; text-align: center; }
    h1 { color: #667eea; }
  `]
})
export class GestaoUtentesComponent {}