/// <reference types="@types/googlemaps" />
import { TripsService, Trip } from './services/trips.service';
import { EditTripDialogComponent } from '../edit-trip-dialog/edit-trip-dialog.component';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTripDialogComponent } from '../add-new-trip-dialog/add-new-trip-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { LatLng, Marker } from '@agm/core';
import { Subscription } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnDestroy {
  private today: Date;

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'comment', 'startsIn', 'actions'];
  dataSource = new MatTableDataSource<Trip>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private map;
  private markers: Marker[] = [];

  private oneSecondInterval;
  private tripsSubscription: Subscription;
  constructor(
    private dialog: MatDialog,
    private tripsService: TripsService) { }

  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (trip, f) => {
      return `${trip.destination.formatted_address} ${trip.comment}`.toLowerCase().includes(f.toLowerCase());
    };

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.oneSecondInterval = setInterval(() => {
      this.today = new Date();
      this.today.setHours(0, 0, 0, 0);
    }, 1000);

    this.tripsSubscription = this.tripsService.getTrips()
      .subscribe(data => {
        this.dataSource.data = data;

        this.deleteAllMarkers();
        data.forEach(trip => {
          this.addMarker(trip.destination.geometry.location, trip.destination.formatted_address);
        });
      });

    this.tripsService.fetchTrips();
  }

  ngOnDestroy() {
    clearInterval(this.oneSecondInterval);
    this.tripsSubscription.unsubscribe();
  }

  filterTrips(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddNewTripDialogComponent);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.tripsService.createTrip(data).subscribe();
      }
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
      if (editedTrip) {
        this.tripsService.editTrip(editedTrip).subscribe();
      }
    });
  }

  showOnMap(trip: Trip) {
    this.map.setCenter(trip.destination.geometry.location);
  }

  timeUntil(trip: Trip) {
    const diffTime = +trip.startDate - +this.today;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Already started';
    }

    if (diffDays === 0) {
      return 'Today';
    }

    if (diffDays === 1) {
      return 'Tomorrow';
    }

    return diffDays + ' days';
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
