import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private utenteService = inject(UtenteService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.utenteService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}