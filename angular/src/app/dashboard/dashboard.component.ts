import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  canSeeUsers: Observable<boolean>;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.canSeeUsers = this.authService.canSeeUsers() as Observable<boolean>;
  }
}

