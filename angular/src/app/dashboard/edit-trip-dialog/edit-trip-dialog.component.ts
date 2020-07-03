import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.scss']
})
export class EditTripDialogComponent implements OnInit {
  trip;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.trip = JSON.parse(JSON.stringify(data));
  }
  ngOnInit(): void { }
}
