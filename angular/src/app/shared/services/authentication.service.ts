import { RolesService, Role } from './../../users/services/roles.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<Token | undefined>(
    localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : undefined);

  constructor(
    private http: HttpClient,
    private router: Router,
    private rolesService: RolesService) {
    }

  register(username: string, password: string) {
    return this.http.post<RegisterResponse>('authentication/register', {username, password})
      .pipe(
        tap((r) => {
        if (r.success) {
          localStorage.setItem('access_token', JSON.stringify(r.token));
          this.loggedIn.next(r.token);
        }
      }));
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('authentication/login', {username, password})
      .pipe(
      tap((r) => {
        if (r.success) {
          localStorage.setItem('access_token', JSON.stringify(r.token));
          this.loggedIn.next(r.token);
        }
      }));
  }

  isLogged(lastValue = false): Observable<boolean> | boolean{
    if (!lastValue) {
      return this.loggedIn.asObservable()
        .pipe(
          map(t => !!t)
        );
    } else {
      return !!this.loggedIn.getValue();
    }
  }

  canSeeUsers(lastValue = false): Observable<boolean> | boolean {
    if (!lastValue) {
      return combineLatest([this.loggedIn.asObservable(), this.rolesService.get() as Observable<Role[]>])
      .pipe(
        map(([token, roles]) => {

          const role = roles.find((r) => r.value === token.role);
          return token && (role.name === 'Administrator' || role.name === 'User Manager');
        }));
    } else {
      const roles = this.rolesService.get(true) as Role[];

      const token = this.loggedIn.getValue();

      const role = roles.find((r) => r.value === token.role);

      return token && (role.name === 'Administrator' || role.name === 'User Manager');
    }
  }

  logOut() {
    localStorage.setItem('access_token', '');
    return this.http.post('authentication/logout', {})
    .pipe(
      tap(_ => {
        this.loggedIn.next(undefined);
        this.router.navigate(['/']);
    }));
  }
}

interface Token {
  userId: number;
  name: string;
  role: number;
}

interface RegisterResponse {
  success: boolean;
  token?: Token;
  message?: string;
}

interface LoginResponse {
  success: boolean;
  token?: Token;
  message?: string;
}
