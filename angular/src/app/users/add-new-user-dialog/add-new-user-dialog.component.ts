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

  roles = [{ name: 'Regular', value: 0 }, { name: 'User Manager', value: 1}, { name: 'Administrator', value: 2}];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
}
