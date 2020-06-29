/// <reference types="@types/googlemaps" />
import { EditTripDialogComponent } from './edit-trip-dialog/edit-trip-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTripDialogComponent } from './add-new-trip-dialog/add-new-trip-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';

declare var google: any;

export interface PeriodicElement {
  endDate: Date;
  startDate: Date;
  comment: string;
  destination: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {startDate: new Date(), endDate: new Date(), comment: 'comment', destination: 'Destination1'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment2', destination: 'Destination2'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment3', destination: 'Destination3'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment4', destination: 'Destination4'}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'comment', 'startsIn', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  map;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });


    this.dataSource.paginator = this.paginator;
  }

  filterTrips(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewTripDialogComponent);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

  delete(trip) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Do you want to delete following trip?`,
        body: `Destination: ${trip.destination}\r\n` +
        `Starts: ${new DatePipe('en-US').transform(trip.startDate, 'yyyy/MM/dd')}\r\n` +
        `Ends: ${new DatePipe('en-US').transform(trip.endDate, 'yyyy/MM/dd')}\r\n` +
        `Comment: ${trip.comment}\r\n`
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

  edit(trip) {
    const dialogRef = this.dialog.open(EditTripDialogComponent, {
      data: trip
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }
}

