import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'home',
  redirectTo: ''
}, {
  path: 'dashboard',
  canActivate: [AuthGuard],
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
