import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private roles = [{ name: 'Regular', value: 1 }, { name: 'User Manager', value: 2}, { name: 'Administrator', value: 3}];

  constructor() { }

  get(lastValue = false) {
    if (!lastValue) {
      return of(this.roles);
    }

    return this.roles;
  }

  getName(role) {
    return of(this.roles.find(r => r.value === role)?.name);
  }
}

export interface Role {
  name: string;
  value: number;
}
