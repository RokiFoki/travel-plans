import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(username: string, password: string) {
    return this.http.post<RegisterResponse>('authentication/register', {username, password})
      .pipe(
        tap((r) => {
        if (r.success) {
          localStorage.setItem('access_token', JSON.stringify(r.token));
          this.loggedIn.next(true);
        }
      }));
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>('authentication/login', {username, password})
      .pipe(
      tap((r) => {
        if (r.success) {
          localStorage.setItem('access_token', JSON.stringify(r.token));
          this.loggedIn.next(true);
        }
      }));
  }

  isLogged() {
    return this.loggedIn;
  }

  logOut() {
    localStorage.setItem('access_token', '');
    return this.http.post('authentication/logout', {})
    .pipe(
      tap(_ => {
        this.loggedIn.next(false);
        this.router.navigate(['/']);
    }));
  }
}


interface RegisterResponse {
  success: boolean;
  token?: {
    userId: number;
    name: string;
    role: number
  };
  message?: string;
}

interface LoginResponse {
  success: boolean;
  token?: {
    userId: number;
    name: string;
    role: number
  };
  message?: string;
}
