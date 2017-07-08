import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable ()
export class MockAlertsService {
  private alertsSubject = new ReplaySubject<string> (1);

  set testAlertError (error: string) {
    this.alertsSubject.error (error);
  }

  public getAlerts (): Observable<string> {
    return this.alertsSubject.asObservable ();
  }

  public addAlert (message: string) {
    this.alertsSubject.next (message);
  }
}
