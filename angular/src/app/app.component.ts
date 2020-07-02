import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: Observable<boolean>;
  constructor(private authenticationService: AuthenticationService) {
    this.loggedIn = this.authenticationService.isLogged();
  }

  logOut() {
    this.authenticationService.logOut().subscribe();
  }


}
