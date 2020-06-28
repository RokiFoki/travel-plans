import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  endDate: Date;
  startDate: Date;
  comment: string;
  destination: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {startDate: new Date(), endDate: new Date(), comment: 'comment', destination: 'Destination'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment2', destination: 'Destination'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment3', destination: 'Destination'},
  {startDate: new Date(), endDate: new Date(), comment: 'comment4', destination: 'Destination'},
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

    this.dataSource.paginator = this.paginator;
  }
}

