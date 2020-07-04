import { UserData } from './users.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RolesService } from './roles.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = new BehaviorSubject<User[]>([]);

  constructor(
    private http: HttpClient,
    private rolesService: RolesService) { }

  get() {
    return this.users.asObservable();
  }

  fetch() {
    this.http.get('/api/users').subscribe((data: any[]) => {
      this.users.next(data.map(e => new User(e, this.rolesService)));
    });
  }

  create(user: UserData) {
    return this.http.post('/api/users', user)
      .pipe(
        map(e => {
          return new User(e, this.rolesService);
        }),
        tap(u => {
          const users = [...this.users.getValue()];
          users.push(u);

          this.users.next(users);
        })
      );
  }

  delete(userId: number) {
    return this.http.delete('/api/users/' + userId)
      .pipe(
        tap(() => {
          const users = [...this.users.getValue().filter(u => u.id !== userId)];
          this.users.next(users);
        })
      );
  }

  edit(user: UserData) {
    return this.http.put('/api/users/' + user.id, user)
      .pipe(
        tap(() => {
          const users = [...this.users.getValue().map(u => u.id !== user.id ? u : new User(user, this.rolesService))];
          this.users.next(users);
        })
      );
  }
}

export interface UserData {
  id: number;
  username: string;
  role: number;
}

export class User implements UserData {
  public id: number;
  public username: string;
  public role: number;

  constructor(
    data: any,
    private rolesService: RolesService) {
      this.id = data.id;
      this.username = data.username;
      this.role = data.role;
    }

  roleName() {
    return this.rolesService.getName(this.role);
  }

  getData(): UserData {
    const data = {...this};
    delete data.rolesService;

    return data;
  }
}
