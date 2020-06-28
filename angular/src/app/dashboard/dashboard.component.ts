import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  endDate: Date;
  startDate: Date;
  comment: string;
  destination: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {startDate: new Date(), endDate: new Date(), comment: 'comment', destination: 'Destination'},
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['destination', 'startDate', 'endDate', 'comment', 'startsIn', 'actions'];
  dataSource = ELEMENT_DATA;

  map;

  constructor() { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB5Xxxiq8p69G9HlVX9a6wgYILVLtvYrds';
    script.defer = true;
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
    };
  }
}

