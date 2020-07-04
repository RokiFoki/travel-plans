import { RolesService } from './../services/roles.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../services/users.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  user;

  roles;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private rolesService: RolesService) {
    this.user = new User(data, rolesService);
  }

  ngOnInit(): void {
    this.roles = this.rolesService.get();
  }

  submit() {
    this.dialogRef.close(this.user);
  }
}
