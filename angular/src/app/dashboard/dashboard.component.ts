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

  constructor() { }

  ngOnInit(): void {
  }

}
