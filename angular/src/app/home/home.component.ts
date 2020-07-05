import { AuthenticationService } from '../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   register = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  signin(form: NgForm) {
    this.authenticationService.register(form.value.username, form.value.password)
      .subscribe(r => {
        if (r.success) {
          this.router.navigate(['/dashboard']);
        }
      },
      (e: HttpErrorResponse) => {
        console.log(e);
        this.snackBar.open(`Unsuccesful registration attempt: ${e.error.message || ''}`, undefined, {
          duration: 2000
        });
      });
  }

  login(form: NgForm) {
    this.authenticationService.login(form.value.username, form.value.password)
    .subscribe(r => {
      if (r.success) {
        this.router.navigate(['/dashboard']);
      }
    },
    (e: HttpErrorResponse) => {
      this.snackBar.open(`Unsuccesful registration attempt: ${e.error.message || ''}`, undefined, {
        duration: 2000
      });
    });
  }
}
