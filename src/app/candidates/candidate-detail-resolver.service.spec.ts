import { TestBed, inject, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AlertsService } from '../alerts.service';
import { MockAlertsService } from '../../test/mocks/app/alerts.service';
import { CandidatesService } from '../api/api/api';
import { MockCandidatesService } from '../../test/mocks/app/api/candidates.service';
import { CandidateDetailResolverService } from './candidate-detail-resolver.service';

describe('CandidateDetailResolverService', () => {
  let service: CandidateDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: CandidatesService,
        useClass: MockCandidatesService
      }, {
        provide: AlertsService,
        useClass: MockAlertsService
      }, CandidateDetailResolverService]
    });
  });

  beforeEach (inject ([CandidateDetailResolverService], (s: CandidateDetailResolverService) => {
    service = s;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe ('gotoCandidates ()', () => {
    let router: Router;

    beforeEach (() => {
      router = service['router'];

      spyOn (router, 'navigate');

      service.gotoCandidates ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/candidates']);
    });
  });

  describe ('resolve ()', () => {
    let mockRouterState: RouterStateSnapshot;
    let activated: ActivatedRouteSnapshot;
    let candidatesService: MockCandidatesService;

    beforeEach (() => {
      candidatesService = service['service'] as any;
      mockRouterState = jasmine.createSpyObj<RouterStateSnapshot> ('RouterStateSnapshot', ['toString']);
      activated = new ActivatedRouteSnapshot ();
      activated.params = {
        id: 0
      };
    });

    it ('should return an Observable', () => {
      expect (service.resolve (activated, mockRouterState)).toEqual (jasmine.any (Observable));
    });

    describe ('Candidate received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoCandidates');

        candidatesService.testCandidate = {};

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should not have called gotoCandidates ()', () => {
        expect (service.gotoCandidates).not.toHaveBeenCalled ();
      });
    });

    describe ('Candidate not received', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoCandidates');

        candidatesService.testCandidate = null;

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoCandidates ()', () => {
        expect (service.gotoCandidates).toHaveBeenCalled ();
      });
    });

    describe ('Error', () => {
      beforeEach (async (() => {
        spyOn (service, 'gotoCandidates');

        candidatesService.testCandidateError = 'Error';

        service.resolve (activated, mockRouterState).subscribe ();
      }));

      it ('should have called gotoCandidates ()', () => {
        expect (service.gotoCandidates).toHaveBeenCalled ();
      });
    });
  });
});
