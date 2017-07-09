import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PlacementListComponent } from './placement-list/placement-list.component';
import { PlacementDetailComponent } from './placement-detail/placement-detail.component';

import { PlacementsService } from '../api/api/api';

import { PlacementsRoutingModule } from './placements-routing.module';

import { SharedModule } from '../shared/shared.module';
import { PlacementTimesheetsComponent } from './placement-timesheets/placement-timesheets.component';

@NgModule ({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PlacementsRoutingModule,
    NgbModule
  ],
  declarations: [
    PlacementListComponent,
    PlacementDetailComponent,
    PlacementTimesheetsComponent,
  ],
  providers: [
    PlacementsService
  ]
})
export class PlacementsModule {}
