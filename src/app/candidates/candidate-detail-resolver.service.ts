import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CandidatesService } from '../api/api/api';
import { SonovatetestCandidate } from '../api/model/models';
import { AlertsService } from '../alerts.service';

@Injectable ()
export class CandidateDetailResolverService implements Resolve<SonovatetestCandidate> {
  constructor (private service: CandidatesService,
               private router: Router,
               private alertsService: AlertsService) {
  }

  gotoCandidates () {
    this.router.navigate (['/candidates']);
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonovatetestCandidate> {
    const id = route.params['id'];

    return this.service.sonovatetestStoreReadCandidate (id)
      .take (1)
      .do ((candidate) => {
        if (!candidate) {
          this.gotoCandidates ();
        }
      })
      .catch ((error) => {
        this.alertsService.addAlert (`Detail resolver service error: ${error}`);
        this.gotoCandidates ();

        return Observable.of<SonovatetestCandidate> (null);
      });
  }
}
