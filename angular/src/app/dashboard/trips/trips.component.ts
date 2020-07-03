/// <reference types="@types/googlemaps" />
import { TripsService, Trip } from './services/trips.service';
import { EditTripDialogComponent } from '../edit-trip-dialog/edit-trip-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTripDialogComponent } from '../add-new-trip-dialog/add-new-trip-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { LatLng, Marker } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'comment', 'startsIn', 'actions'];
  dataSource = new MatTableDataSource<Trip>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  map;
  private markers: Marker[] = [];

  constructor(
    private dialog: MatDialog,
    private tripsService: TripsService) { }

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });

    this.dataSource.paginator = this.paginator;

    this.tripsService.getTrips()
      .subscribe(data => {
        this.dataSource.data = data;

        this.deleteAllMarkers();
        data.forEach(trip => {
          this.addMarker(trip.destination.geometry.location, trip.destination.formatted_address);
        });
      });

    this.tripsService.fetchTrips();
  }

  filterTrips(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewTripDialogComponent);

    dialogRef.afterClosed().subscribe((data: any) => {
      this.tripsService.createTrip(data).subscribe();
    });
  }

  delete(trip: Trip) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Do you want to delete following trip?`,
        body: `Destination: ${trip.destination.formatted_address}\r\n` +
        `Starts: ${new DatePipe('en-US').transform(trip.startDate, 'yyyy/MM/dd')}\r\n` +
        `Ends: ${new DatePipe('en-US').transform(trip.endDate, 'yyyy/MM/dd')}\r\n` +
        `Comment: ${trip.comment}\r\n`
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) {
        this.tripsService.deleteTrip(trip.id).subscribe();
      }
    });
  }

  edit(trip) {
    const dialogRef = this.dialog.open(EditTripDialogComponent, {
      data: trip
    });

    dialogRef.afterClosed().subscribe((editedTrip) => {
      this.tripsService.editTrip(editedTrip).subscribe();
    });
  }

  private addMarker(latLng: LatLng, title: string) {
    const marker: Marker = new google.maps.Marker({
      position: latLng,
      title
    });

    marker.setMap(this.map);
    this.map.setCenter(latLng);

    this.markers.push(marker);

    return marker;
  }

  private deleteAllMarkers() {
    this.markers.forEach(m => {
      m.setMap(null);
    });

    this.markers = [];
  }
}
