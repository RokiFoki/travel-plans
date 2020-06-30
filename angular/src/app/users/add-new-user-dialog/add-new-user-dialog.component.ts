import { RolesService } from './../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.scss']
})
export class AddNewUserDialogComponent implements OnInit {
  userForm = this.fb.group({
    username: ['', Validators.required],
    role: ['', Validators.required]
  });

  roles;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService) { }

  ngOnInit(): void {
    this.roles = this.rolesService.get();
  }
}
