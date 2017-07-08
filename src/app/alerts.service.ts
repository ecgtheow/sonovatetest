import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable ()
export class AlertsService {
  private subject: ReplaySubject<string> = new ReplaySubject<string> (5);

  constructor() {
  }

  public getAlerts (): Observable<string> {
    return this.subject.asObservable ();
  }

  public addAlert (message: string) {
    this.subject.next (message);
  }
}
