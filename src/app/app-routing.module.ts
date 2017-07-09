import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [{
  path: '',
  redirectTo: '/clients',
  pathMatch: 'full'
}, {
  path: '**',
  redirectTo: '/clients',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule { }
