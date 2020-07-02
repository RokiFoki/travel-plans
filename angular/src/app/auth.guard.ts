import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

   canActivate(): boolean {
    const isLogged = this.authService.isLogged(true) as boolean;

    if (!isLogged) {
      this.router.navigate(['/']);
    }

    return isLogged;
  }

}
