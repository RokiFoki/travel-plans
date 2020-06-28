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


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,

    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
