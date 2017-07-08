import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AlertsService } from '../alerts.service';
import { MockAlertsService } from '../../test/mocks/app/alerts.service';
import { ClientsService } from '../api/api/api';
import { MockClientsService } from '../../test/mocks/app/api/clients.service';
import { ClientDetailResolverService } from './client-detail-resolver.service';

describe('ClientDetailResolverService', () => {
  let service: ClientDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: ClientsService,
        useClass: MockClientsService
      }, {
        provide: AlertsService,
        useClass: MockAlertsService
      }, ClientDetailResolverService]
    });
  });

  beforeEach (inject ([ClientDetailResolverService], (s: ClientDetailResolverService) => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe ('gotoClients ()', () => {
    let router: Router;

    beforeEach (() => {
      router = service['router'];

      spyOn (router, 'navigate');

      service.gotoClients ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/clients']);
    });
  });

  describe ('resolve ()', () => {
    let mockRouterState: RouterStateSnapshot;
    let activated: ActivatedRouteSnapshot;
    let clientsService: MockClientsService;

    beforeEach (() => {
      clientsService = service['service'] as any;
      mockRouterState = jasmine.createSpyObj<RouterStateSnapshot> ('RouterStateSnapshot', ['toString']);
      activated = new ActivatedRouteSnapshot ();
      activated.params = {
        id: 0
      };
    });

    it ('should return an Observable', () => {
      expect (service.resolve (activated, mockRouterState)).toEqual (jasmine.any (Observable));
    });

    describe ('Client received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoClients');

        clientsService.testClient = {};

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should not have called gotoClients ()', () => {
        expect (service.gotoClients).not.toHaveBeenCalled ();
      });
    });

    describe ('Client not received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoClients');

        clientsService.testClient = null;

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoClients ()', () => {
        expect (service.gotoClients).toHaveBeenCalled ();
      });
    });

    describe ('Error', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoClients');

        clientsService.testClientError = 'Error';

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoClients ()', () => {
        expect (service.gotoClients).toHaveBeenCalled ();
      });
    });
  });
});
