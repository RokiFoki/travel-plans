import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private trips$ = new BehaviorSubject<Trip[]>([]);
  private userId: number;

  constructor(
    private http: HttpClient) { }

  getTrips() {
    return this.trips$.asObservable();
  }

  useUser(userId: number) {
    this.userId = userId;
  }

  fetchTrips() {
    let params = new HttpParams();

    if (this.userId) {
      params = params.set('forUser', this.userId.toString());
    }

    this.http.get('/api/trips', { params }).subscribe((data: any[]) => {
      this.trips$.next(data.map(e => new Trip(e)));
    });
  }

  createTrip(trip: Trip) {
    let params = new HttpParams();

    if (this.userId) {
      params = params.set('forUser', this.userId.toString());
    }

    return this.http.post('/api/trips', trip, { params })
      .pipe(
        map(e => {
          return new Trip(e);
        }),
        tap((t: Trip) => {
          const trips = [...this.trips$.getValue()];
          trips.push(t);

          this.trips$.next(trips);
        })
      );
  }

  deleteTrip(tripId: number) {
    let params = new HttpParams();

    if (this.userId) {
      params = params.set('forUser', this.userId.toString());
    }

    return this.http.delete('/api/trips/' + tripId, { params })
      .pipe(
        tap(() => {
          const trips = [...this.trips$.getValue().filter(t => t.id !== tripId)];
          this.trips$.next(trips);
        })
      );
  }

  editTrip(trip: Trip) {
    let params = new HttpParams();

    if (this.userId) {
      params = params.set('forUser', this.userId.toString());
    }

    return this.http.put('/api/trips/' + trip.id, trip, { params })
      .pipe(
        tap(() => {
          const trips = [...this.trips$.getValue().map(t => t.id !== trip.id ? t : trip)];
          this.trips$.next(trips);
        })
      );
  }
}

export class Trip {
  id: number;
  destination: any;
  startDate: Date;
  endDate: Date;
  comment: string;

  constructor(tripModel: any) {
    this.id = tripModel.id;
    this.destination = tripModel.destination;
    this.startDate = new Date(tripModel.start_date);
    this.endDate = new Date(tripModel.end_date);
    this.comment = tripModel.comment;
  }

}
