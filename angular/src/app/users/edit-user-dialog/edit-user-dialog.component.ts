import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  user;

  roles = [{ name: 'Regular', value: 0 }, { name: 'User Manager', value: 1}, { name: 'Administrator', value: 2}];

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.user = JSON.parse(JSON.stringify(data));
  }

  ngOnInit(): void { }
}
