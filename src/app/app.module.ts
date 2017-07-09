import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BASE_PATH } from './api/variables';

import { SharedModule } from './shared/shared.module';
import { CandidatesModule } from './candidates/candidates.module';
import { ClientsModule } from './clients/clients.module';
import { PlacementsModule } from './placements/placements.module';
import { AlertsService } from './alerts.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CandidatesModule,
    ClientsModule,
    PlacementsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot ()
  ],
  providers: [
    AlertsService,
    {
      provide: BASE_PATH,
      useValue: 'http://localhost:8080'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
