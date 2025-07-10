import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UtenteService } from '../../services/utente.service';
import { Utente } from '../../models/utente.model';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cabecalho.component.html',
  styleUrl: './cabecalho.component.css'
})
export class CabecalhoComponent implements OnInit {
  currentUser: Utente | null = null;

  constructor(
    private utenteService: UtenteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.utenteService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.utenteService.logout();
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToProfile() {
    if (this.currentUser?.role === 'utente') {
      this.router.navigate(['/historico']);
    } else if (this.currentUser?.role === 'administrativo') {
      this.router.navigate(['/administracao']);
    } else if (this.currentUser?.role === 'admin') {
      this.router.navigate(['/gestao-utentes']);
    }
  }
}