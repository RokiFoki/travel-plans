import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private roles = [{ name: 'Regular', value: 0 }, { name: 'User Manager', value: 1}, { name: 'Administrator', value: 2}];

  constructor() { }

  get() {
    return of(this.roles);
  }
}
