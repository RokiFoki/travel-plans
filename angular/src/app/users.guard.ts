import { AuthenticationService } from './shared/services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router) { }
  canActivate(): boolean {
    const isLogged = this.authService.isLogged(true) as boolean;

    if (!isLogged) {
      this.router.navigate(['/']);
    }

    const canSeeUsers = this.authService.canSeeUsers(true) as boolean;

    if (canSeeUsers) {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }

}
