import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AlertsService } from '../alerts.service';
import { MockAlertsService } from '../../test/mocks/app/alerts.service';
import { PlacementsService } from '../api/api/api';
import { MockPlacementsService } from '../../test/mocks/app/api/placements.service';
import { PlacementClientDetailResolverService } from './placement-client-detail-resolver.service';

describe('PlacementClientDetailResolverService', () => {
  let service: PlacementClientDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: PlacementsService,
        useClass: MockPlacementsService
      }, {
        provide: AlertsService,
        useClass: MockAlertsService
      }, PlacementClientDetailResolverService]
    });
  });

  beforeEach (inject ([PlacementClientDetailResolverService], (s: PlacementClientDetailResolverService) => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe ('gotoPlacements ()', () => {
    let router: Router;

    beforeEach (() => {
      router = service['router'];

      spyOn (router, 'navigate');

      service.gotoPlacements ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/placements']);
    });
  });

  describe ('resolve ()', () => {
    let mockRouterState: RouterStateSnapshot;
    let activated: ActivatedRouteSnapshot;
    let placementsService: MockPlacementsService;

    beforeEach (() => {
      placementsService = service['service'] as any;
      mockRouterState = jasmine.createSpyObj<RouterStateSnapshot> ('RouterStateSnapshot', ['toString']);
      activated = new ActivatedRouteSnapshot ();
      activated.params = {
        id: 0
      };
    });

    it ('should return an Observable', () => {
      expect (service.resolve (activated, mockRouterState)).toEqual (jasmine.any (Observable));
    });

    describe ('Placement received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoPlacements');

        placementsService.testPlacementClient = {};

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should not have called gotoPlacements ()', () => {
        expect (service.gotoPlacements).not.toHaveBeenCalled ();
      });
    });

    describe ('Placement not received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoPlacements');

        placementsService.testPlacementClient = null;

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoPlacements ()', () => {
        expect (service.gotoPlacements).toHaveBeenCalled ();
      });
    });

    describe ('Error', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoPlacements');

        placementsService.testPlacementClientError = 'Error';

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoPlacements ()', () => {
        expect (service.gotoPlacements).toHaveBeenCalled ();
      });
    });
  });
});
