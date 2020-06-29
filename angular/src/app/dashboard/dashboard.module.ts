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
import { EditTripDialogComponent } from './edit-trip-dialog/edit-trip-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    DashboardComponent,
    AddNewTripDialogComponent,
    ConfirmDialogComponent,
    EditTripDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB5Xxxiq8p69G9HlVX9a6wgYILVLtvYrds',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
