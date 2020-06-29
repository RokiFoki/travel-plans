import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.tripForm.value.destination.geometry.location.lat());
  }

}
