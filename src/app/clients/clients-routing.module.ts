import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';

import { ClientDetailResolverService } from './client-detail-resolver.service';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientAddComponent } from './client-add/client-add.component';

const routes: Routes = [{
  path: 'clients',
  component: ClientListComponent
}, {
  path: 'client/new',
  component: ClientAddComponent,
  canDeactivate: [ CanDeactivateGuard ]
}, {
  path: 'client/:id',
  component: ClientDetailComponent,
  canDeactivate: [ CanDeactivateGuard ],
  resolve: {
    client: ClientDetailResolverService
  }
}];

@NgModule ({
  imports: [
    RouterModule.forChild (routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ClientDetailResolverService
  ]
})
export class ClientsRoutingModule {}
