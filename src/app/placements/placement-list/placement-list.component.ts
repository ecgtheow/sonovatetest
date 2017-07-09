import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SonovatetestPlacement } from '../../api/model/models';
import { PlacementsService } from '../../api/api/api';
import { AlertsService } from '../../alerts.service';
import { AreYouSureDeleteDialogComponent } from '../../are-you-sure-delete-dialog/are-you-sure-delete-dialog.component';

@Component ({
  selector: 'app-placement-list',
  templateUrl: './placement-list.component.html',
  styleUrls: ['./placement-list.component.scss']
})
export class PlacementListComponent implements OnInit {
  placements: Observable<SonovatetestPlacement[]>;
  selectedId: number;

  constructor (private router: Router,
               private route: ActivatedRoute,
               private service: PlacementsService,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
  }

  ngOnInit (): void {
    this.placements = this.route.params
      .switchMap ((params: Params) => {
        this.selectedId = +params['id'];

        return this.service.sonovatetestStoreReadPlacements ();
      });
  }

  onSelect (placement: SonovatetestPlacement): void {
    if (placement) {
      this.router.navigate (['/placement', placement.id]);
    }
  }

  onDelete (placement: SonovatetestPlacement): void {
    if (placement) {
      this.dialog.open (AreYouSureDeleteDialogComponent).result
        .then ((result) => {
          if (result) {
            this.service.sonovatetestStoreDeletePlacement (placement.id)
              .take (1)
              .do (() => {
                /* Re-read the placements list, now we've deleted one */
                this.placements = this.service.sonovatetestStoreReadPlacements ();
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

  isSelected (placement: SonovatetestPlacement): boolean {
    return !!placement && (placement.id === this.selectedId);
  }

  add (): void {
    this.router.navigate (['/placement', 'new']);
  }
}
