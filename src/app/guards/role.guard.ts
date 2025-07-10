import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UtenteService } from '../services/utente.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  private utenteService = inject(UtenteService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const currentUser = this.utenteService.getCurrentUser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles.includes(currentUser.role)) {
      return true;
    } else {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
  }
}