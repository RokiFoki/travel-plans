import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTripDialogComponent implements OnInit {
  trip;

  @ViewChild('tripForm', {static: true}) tripForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<EditTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.trip = {... data };
  }
  ngOnInit(): void { }

  submit() {
    if (this.tripForm.valid) {
      this.dialogRef.close(this.trip);
    }
  }
}
