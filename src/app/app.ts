import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CabecalhoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('appMarcacaoXPTO');
}
