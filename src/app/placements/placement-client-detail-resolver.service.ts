import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PlacementsService } from '../api/api/api';
import { SonovatetestClient } from '../api/model/models';
import { AlertsService } from '../alerts.service';

@Injectable ()
export class PlacementClientDetailResolverService implements Resolve<SonovatetestClient> {
  constructor (private service: PlacementsService,
               private router: Router,
               private alertsService: AlertsService) {
  }

  gotoPlacements () {
    this.router.navigate (['/placements']);
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonovatetestClient> {
    const id = route.params['id'];

    return this.service.sonovatetestStoreReadPlacementClient (id)
      .take (1)
      .do ((client) => {
        if (!client) {
          this.gotoPlacements ();
        }
      })
      .catch ((error) => {
        this.alertsService.addAlert (`Placement Client detail resolver service error: ${error}`);
        this.gotoPlacements ();

        return Observable.of<SonovatetestClient> (null);
      });
  }
}
