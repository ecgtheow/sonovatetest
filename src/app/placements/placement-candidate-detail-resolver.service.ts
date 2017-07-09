import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PlacementsService } from '../api/api/api';
import { SonovatetestCandidate } from '../api/model/models';
import { AlertsService } from '../alerts.service';

@Injectable ()
export class PlacementCandidateDetailResolverService implements Resolve<SonovatetestCandidate> {
  constructor (private service: PlacementsService,
               private router: Router,
               private alertsService: AlertsService) {
  }

  gotoPlacements () {
    this.router.navigate (['/placements']);
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonovatetestCandidate> {
    const id = route.params['id'];

    return this.service.sonovatetestStoreReadPlacementCandidate (id)
      .take (1)
      .do ((candidate) => {
        if (!candidate) {
          this.gotoPlacements ();
        }
      })
      .catch ((error) => {
        this.alertsService.addAlert (`Placement Candidate detail resolver service error: ${error}`);
        this.gotoPlacements ();

        return Observable.of<SonovatetestCandidate> (null);
      });
  }
}
