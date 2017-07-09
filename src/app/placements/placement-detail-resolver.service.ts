import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PlacementsService } from '../api/api/api';
import { SonovatetestPlacement } from '../api/model/models';
import { AlertsService } from '../alerts.service';

@Injectable ()
export class PlacementDetailResolverService implements Resolve<SonovatetestPlacement> {
  constructor (private service: PlacementsService,
               private router: Router,
               private alertsService: AlertsService) {
  }

  gotoPlacements () {
    this.router.navigate (['/placements']);
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonovatetestPlacement> {
    const id = route.params['id'];

    return this.service.sonovatetestStoreReadPlacement (id)
      .take (1)
      .do ((placement) => {
        if (!placement) {
          this.gotoPlacements ();
        }
      })
      .catch ((error) => {
        this.alertsService.addAlert (`Detail resolver service error: ${error}`);
        this.gotoPlacements ();

        return Observable.of<SonovatetestPlacement> (null);
      });
  }
}
