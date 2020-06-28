import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { AddNewTripDialogComponent } from './add-new-trip-dialog/add-new-trip-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddNewTripDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,

    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DashboardModule { }
