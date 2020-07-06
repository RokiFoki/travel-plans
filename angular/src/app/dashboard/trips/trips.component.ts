/// <reference types="@types/googlemaps" />
import { TripsService, Trip } from './services/trips.service';
import { EditTripDialogComponent } from '../edit-trip-dialog/edit-trip-dialog.component';
import { Component, OnInit, ViewChild, OnDestroy, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTripDialogComponent } from '../add-new-trip-dialog/add-new-trip-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';
import { LatLng, Marker } from '@agm/core';
import { Subscription, Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { UsersService, User } from './../../users/services/users.service';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';

declare var google: any;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsComponent implements OnInit, OnDestroy {
  private today: Date;
  tripsNextMonth$: Observable<Trip[]>;

  canSeeUserTrips$: Observable<boolean>;
  private users$ = new BehaviorSubject<User[]>([]);
  filteredUsers$: Observable<User[]>;
  @ViewChild('forUserControl', {static: false}) forUserControl: ElementRef;

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'comment', 'startsIn', 'actions'];
  dataSource = new MatTableDataSource<Trip>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  private map;
  private markers: Marker[] = [];

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  private usersInput$ = new BehaviorSubject<string>('');

  private oneSecondInterval;
  private tripsSubscription: Subscription;
  public forUser$: Observable<number>;
  constructor(
    private dialog: MatDialog,
    private tripsService: TripsService,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initGoogleMaps();
    this.initTripsTable();

    this.initCanSeeUserTrips();
  }

  ngOnDestroy() {
    clearInterval(this.oneSecondInterval);
    this.tripsSubscription.unsubscribe();
  }

  switchToUser(event: MatAutocompleteSelectedEvent) {
    this.router.navigate(['/dashboard/trips'], { queryParams: {forUser: event.option.value.id}});
  }

  displayUser(user: User) {
    return user ? user.username : '';
  }

  filterTrips(event: KeyboardEvent) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim();
  }

  filterUsers(event: KeyboardEvent) {
    this.usersInput$.next((event.target as HTMLInputElement).value.trim());
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

  printNextMonth() {
    this.tripsNextMonth$ = this.tripsService.getTrips()
    .pipe(
      map(trips => {
        return trips.filter(t => {
          const today = new Date();
          const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
          const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, -1);

          return nextMonthStart <= t.startDate && t.startDate <= nextMonthEnd ||
                  nextMonthStart <= t.endDate && t.endDate <= nextMonthEnd ||
                  t.startDate <= nextMonthStart && nextMonthEnd <= t.endDate;
        });
      })
    )

    setTimeout(() => {
      const doc = new jsPDF();

      const specialElementHandlers = {
        '#editor': function (element, renderer) {
          return true;
        }
      };

      const pdfTable = this.pdfTable.nativeElement;

      doc.fromHTML(pdfTable.innerHTML, 15, 15, {
        width: 190,
        'elementHandlers': specialElementHandlers
      });

      doc.save('next-month-trips.pdf');
    });

  }

  private initTripsTable() {
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

  private initGoogleMaps() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
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

  private initCanSeeUserTrips() {
    this.canSeeUserTrips$ = this.authService.canSeeUserTrips();

    const canSeeUserTripsInitSubscription = this.authService.canSeeUserTrips()
    .subscribe(canSeeUserTrips => {
      if (canSeeUserTrips) {
        this.usersService.get().subscribe(this.users$);
        this.usersService.fetch();

        // tslint:disable-next-line:no-string-literal
        if (!this.route.snapshot.queryParams['forUser']) {
          this.tripsService.useUser(undefined);
          this.tripsService.fetchTrips();
        }

        this.filteredUsers$ = combineLatest([this.usersInput$, this.users$])
        .pipe(
          map(([input, users]) => {
            return users.filter(u => u.username.includes(input));
          })
        );

        this.forUser$ = this.route.queryParams.
        pipe(
          tap(params => {
            if (params.forUser) {
              this.tripsService.useUser(params.forUser);
              this.tripsService.fetchTrips();
            }
          }),
          map(params => +params.forUser)
        );

        combineLatest([this.users$, this.forUser$])
        .subscribe(([users, forUser]) => {
          const user = users.find(u => u.id === +forUser);
          if (user) {
            const populateField = setInterval(() => {
              if (this.forUserControl) {
                (this.forUserControl.nativeElement as HTMLInputElement).value = user.username;
                clearInterval(populateField);
              }
            }, 500);
          }
        });

        setTimeout(() => canSeeUserTripsInitSubscription.unsubscribe());
      } else {
        if (!this.authService.isLogged(true)) {
          setTimeout(() => canSeeUserTripsInitSubscription.unsubscribe());
        } else {
          this.tripsService.useUser(undefined);
          this.tripsService.fetchTrips();
        }
      }
    });
  }
}
