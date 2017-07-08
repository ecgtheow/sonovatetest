import { Component, OnInit } from '@angular/core';

import './rxjs-operators';

import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private alerts: string[] = [];

  constructor (private alertsService: AlertsService) {
  }

  ngOnInit () {
    this.getAlerts ();
  }

  getAlerts () {
    this.alertsService.getAlerts ()
      .subscribe (message => {
        this.showAlert (message);
      }, error => this.showAlert (`Error displaying alert: ${error}`));
  }

  private showAlert (message: string) {
    this.alerts.push (message);
  }

  private closeAlert (idx: number) {
    this.alerts.splice (idx, 1);
  }
}
