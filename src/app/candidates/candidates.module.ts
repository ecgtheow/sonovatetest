import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';

import { CandidatesService } from '../api/api/api';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidateAddComponent } from './candidate-add/candidate-add.component';

import { SharedModule } from '../shared/shared.module';

@NgModule ({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CandidatesRoutingModule,
    NgbModule
  ],
  declarations: [
    CandidateListComponent,
    CandidateDetailComponent,
    CandidateAddComponent,
  ],
  providers: [
    CandidatesService
  ]
})
export class CandidatesModule {}
