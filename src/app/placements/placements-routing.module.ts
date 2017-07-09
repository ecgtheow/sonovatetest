import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';

import { PlacementDetailResolverService } from './placement-detail-resolver.service';
import { PlacementCandidateDetailResolverService } from './placement-candidate-detail-resolver.service';
import { PlacementClientDetailResolverService } from './placement-client-detail-resolver.service';

import { PlacementListComponent } from './placement-list/placement-list.component';
import { PlacementDetailComponent } from './placement-detail/placement-detail.component';
import { PlacementTimesheetsComponent } from './placement-timesheets/placement-timesheets.component';

const routes: Routes = [{
  path: 'placements',
  component: PlacementListComponent
}, {
  path: 'placement/new',
  component: PlacementDetailComponent,
  canDeactivate: [ CanDeactivateGuard ],
  data: {
    mode: 'add'
  }
}, {
  path: 'placement/:id/timesheets',
  component: PlacementTimesheetsComponent,
  canDeactivate: [ CanDeactivateGuard ],
  resolve: {
    placement: PlacementDetailResolverService,
    candidate: PlacementCandidateDetailResolverService,
    client: PlacementClientDetailResolverService
  }
}, {
  path: 'placement/:id',
  component: PlacementDetailComponent,
  canDeactivate: [ CanDeactivateGuard ],
  resolve: {
    placement: PlacementDetailResolverService
  },
  data: {
    mode: 'edit'
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
    PlacementDetailResolverService,
    PlacementCandidateDetailResolverService,
    PlacementClientDetailResolverService
  ]
})
export class PlacementsRoutingModule {}
