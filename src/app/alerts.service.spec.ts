import { TestBed, inject, async } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { AlertsService } from './alerts.service';

describe ('AlertsService', () => {
  let service: AlertsService;

  beforeEach (() => {
    TestBed.configureTestingModule ({
      providers: [AlertsService]
    });
  });

  beforeEach (inject ([AlertsService], (s: AlertsService) => {
    service = s;
  }));

  it ('should be created', () => {
    expect (service).toBeTruthy ();
  });

  describe ('getAlerts ()', () => {
    it ('should return an Observable', () => {
      expect (service.getAlerts ()).toEqual (jasmine.any (Observable));
    });
  });

  describe ('addAlert ()', () => {
    let sent: string;
    let recv: string;

    beforeEach (async (() => {
      sent = 'sent message';

      service.getAlerts ().subscribe (r => {
        recv = r;
      });

      service.addAlert (sent);
    }));

    it ('should stream the alert to all subscribers', () => {
      expect (recv).toEqual (sent);
    });
  });
});
