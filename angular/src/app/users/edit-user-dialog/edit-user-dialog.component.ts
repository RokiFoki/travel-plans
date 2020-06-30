import { RolesService } from './../services/roles.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  user;

  roles;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private rolesService: RolesService) {
    this.user = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void {
    this.roles = this.rolesService.get();
  }
}
