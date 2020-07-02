import { AuthenticationService } from './authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) { }

  logOut() {
    this.authenticationService.logOut().subscribe();
  }
}
