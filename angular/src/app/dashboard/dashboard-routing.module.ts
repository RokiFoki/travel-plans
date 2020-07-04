import { UsersGuard } from './../users.guard';
import { TripsComponent } from './trips/trips.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '', component: DashboardComponent,
  children: [
    { path: '', redirectTo: 'trips' },
    { path: 'trips', component: TripsComponent}, {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [UsersGuard]
      }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
