import { RolesService } from './../services/roles.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.scss']
})
export class AddNewUserDialogComponent implements OnInit {
  userForm = this.fb.group({
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', Validators.required],
  });

  roles;

  constructor(
    public dialogRef: MatDialogRef<AddNewUserDialogComponent>,
    private fb: FormBuilder,
    private rolesService: RolesService) { }

  ngOnInit(): void {
    this.roles = this.rolesService.get();
  }

  submit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
