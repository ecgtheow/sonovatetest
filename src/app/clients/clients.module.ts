import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

import { ClientsService } from '../api/api/api';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientAddComponent } from './client-add/client-add.component';

import { SharedModule } from '../shared/shared.module';

@NgModule ({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ClientsRoutingModule,
    NgbModule
  ],
  declarations: [
    ClientListComponent,
    ClientDetailComponent,
    ClientAddComponent,
  ],
  providers: [
    ClientsService
  ]
})
export class ClientsModule {}
