import { RolesService } from './../services/roles.service';
import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../services/users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserDialogComponent implements OnInit {
  user;

  roles;

  @ViewChild('userForm', {static: true}) userForm: NgForm;

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
    if (this.userForm.valid) {
      this.dialogRef.close(this.user);
    }
  }
}
