import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SonovatetestClient } from '../../api/model/models';
import { ClientsService } from '../../api/api/api';
import { AlertsService } from '../../alerts.service';
import { AreYouSureDeleteDialogComponent } from '../../are-you-sure-delete-dialog/are-you-sure-delete-dialog.component';

@Component ({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Observable<SonovatetestClient[]>;
  selectedId: number;

  constructor (private router: Router,
               private route: ActivatedRoute,
               private service: ClientsService,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
  }

  ngOnInit (): void {
    this.clients = this.route.params
      .switchMap ((params: Params) => {
        this.selectedId = +params['id'];

        return this.service.sonovatetestStoreReadClients ();
      });
  }

  onSelect (client: SonovatetestClient): void {
    if (client) {
      this.router.navigate (['/client', client.id]);
    }
  }

  onDelete (client: SonovatetestClient): void {
    if (client) {
      this.dialog.open (AreYouSureDeleteDialogComponent).result
        .then ((result) => {
          if (result) {
            this.service.sonovatetestStoreDeleteClient (client.id)
              .take (1)
              .do (() => {
                /* Re-read the clients list, now we've deleted one */
                this.clients = this.service.sonovatetestStoreReadClients ();
              })
              .catch (error => {
                this.alertsService.addAlert (`Delete error: ${error.statusText || 'Unknown error'}`);
                return Observable.of<{}> (null);
              })
              .subscribe ();
          }
        })
        /* Dialog close button is signalled with a rejected Promise */
        .catch (() => {});
    }
  }

  isSelected (client: SonovatetestClient): boolean {
    return !!client && (client.id === this.selectedId);
  }

  add (): void {
    this.router.navigate (['/client', 'new']);
  }
}
