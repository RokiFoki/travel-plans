import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-trip-dialog',
  templateUrl: './add-new-trip-dialog.component.html',
  styleUrls: ['./add-new-trip-dialog.component.scss']
})
export class AddNewTripDialogComponent implements OnInit {
  tripForm = this.fb.group({
    destination: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    comment: ['']
  });

  constructor(
    public dialogRef: MatDialogRef<AddNewTripDialogComponent>,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.tripForm.valid) {
      this.dialogRef.close(this.tripForm.value);
    }
  }
}
