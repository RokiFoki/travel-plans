import { AuthenticationService } from './shared/services/authentication.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loggedIn$: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) {
    this.loggedIn$ = this.authenticationService.isLogged() as Observable<boolean>;
  }

  logOut() {
    this.authenticationService.logOut().subscribe();
  }


}
