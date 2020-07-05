import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private roles$ = new BehaviorSubject<Role[]>([]);

  constructor(http: HttpClient) {
    http.get('/api/roles').subscribe((roles: Role[]) => {
      this.roles$.next(roles);
    });
  }

  get(lastValue = false) {
    if (!lastValue) {
      return this.roles$.asObservable();
    }

    return this.roles$.getValue();
  }

  getName(role, lastValue = false) {
    if (!lastValue) {
      return this.roles$.pipe(map(rs => rs.find(r => r.value === role)?.name));
    } else {
      return this.roles$.getValue().find(r => r.value === role)?.name;
    }
  }
}

export interface Role {
  name: string;
  value: number;
}
