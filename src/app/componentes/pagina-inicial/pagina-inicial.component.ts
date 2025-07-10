import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {
  especialidades = [
    { nome: 'Cardiologia', icone: '❤️', descricao: 'Cuidados especializados para o coração' },
    { nome: 'Medicina Geral', icone: '🩺', descricao: 'Consultas de rotina e acompanhamento' },
    { nome: 'Dermatologia', icone: '🌟', descricao: 'Tratamento da pele e problemas dermatológicos' },
    { nome: 'Ginecologia', icone: '🌸', descricao: 'Saúde da mulher e acompanhamento ginecológico' }
  ];

  servicos = [
    { titulo: 'Marcação Online', descricao: 'Marque suas consultas de forma rápida e prática', icone: '📅' },
    { titulo: 'Histórico Digital', descricao: 'Acesse todo o seu histórico médico online', icone: '📋' },
    { titulo: 'Confirmação Automática', descricao: 'Receba confirmações por email automaticamente', icone: '✉️' },
    { titulo: 'Profissionais Qualificados', descricao: 'Equipe médica altamente qualificada', icone: '👨‍⚕️' }
  ];
}