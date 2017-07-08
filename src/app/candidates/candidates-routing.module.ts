import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../can-deactivate.guard';

import { CandidateDetailResolverService } from './candidate-detail-resolver.service';

import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';

const routes: Routes = [{
  path: 'candidates',
  component: CandidateListComponent
}, {
  path: 'candidate/new',
  component: CandidateAddComponent,
  canDeactivate: [ CanDeactivateGuard ]
}, {
  path: 'candidate/:id',
  component: CandidateDetailComponent,
  canDeactivate: [ CanDeactivateGuard ],
  resolve: {
    candidate: CandidateDetailResolverService
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
    CandidateDetailResolverService
  ]
})
export class CandidatesRoutingModule {}
