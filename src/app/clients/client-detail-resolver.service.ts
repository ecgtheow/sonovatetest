import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ClientsService } from '../api/api/api';
import { SonovatetestClient } from '../api/model/models';
import { AlertsService } from '../alerts.service';

@Injectable ()
export class ClientDetailResolverService implements Resolve<SonovatetestClient> {
  constructor (private service: ClientsService,
               private router: Router,
               private alertsService: AlertsService) {
  }

  gotoClients () {
    this.router.navigate (['/clients']);
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SonovatetestClient> {
    const id = route.params['id'];

    return this.service.sonovatetestStoreReadClient (id)
      .take (1)
      .do ((client) => {
        if (!client) {
          this.gotoClients ();
        }
      })
      .catch ((error) => {
        this.alertsService.addAlert (`Detail resolver service error: ${error}`);
        this.gotoClients ();

        return Observable.of<SonovatetestClient> (null);
      });
  }
}
