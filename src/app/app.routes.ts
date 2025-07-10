import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./componentes/pagina-inicial/pagina-inicial.component').then(m => m.PaginaInicialComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'marcacao-anonima',
    loadComponent: () => import('./componentes/marcacao-anonima/marcacao-anonima.component').then(m => m.MarcacaoAnonimaComponent)
  },
  {
    path: 'marcacao-utente',
    loadComponent: () => import('./componentes/marcacao-utente/marcacao-utente.component').then(m => m.MarcacaoUtenteComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['utente'] }
  },
  {
    path: 'historico',
    loadComponent: () => import('./componentes/historico/historico.component').then(m => m.HistoricoComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['utente'] }
  },
  {
    path: 'administracao',
    loadComponent: () => import('./componentes/administracao/administracao.component').then(m => m.AdministracaoComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['administrativo'] }
  },
  {
    path: 'gestao-utentes',
    loadComponent: () => import('./componentes/gestao-utentes/gestao-utentes.component').then(m => m.GestaoUtentesComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'nao-autorizado',
    loadComponent: () => import('./componentes/shared/nao-autorizado.component').then(m => m.NaoAutorizadoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
