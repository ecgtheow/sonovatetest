import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SonovatetestCandidate } from '../../api/model/models';
import { CandidatesService } from '../../api/api/api';
import { AlertsService } from '../../alerts.service';
import { AreYouSureDeleteDialogComponent } from '../../are-you-sure-delete-dialog/are-you-sure-delete-dialog.component';

@Component ({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  candidates: Observable<SonovatetestCandidate[]>;
  selectedId: number;

  constructor (private router: Router,
               private route: ActivatedRoute,
               private service: CandidatesService,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
  }

  ngOnInit (): void {
    this.candidates = this.route.params
      .switchMap ((params: Params) => {
        this.selectedId = +params['id'];

        return this.service.sonovatetestStoreReadCandidates ();
      });
  }

  onSelect (candidate: SonovatetestCandidate): void {
    if (candidate) {
      this.router.navigate (['/candidate', candidate.id]);
    }
  }

  onDelete (candidate: SonovatetestCandidate): void {
    if (candidate) {
      this.dialog.open (AreYouSureDeleteDialogComponent).result
        .then ((result) => {
          if (result) {
            this.service.sonovatetestStoreDeleteCandidate (candidate.id)
              .take (1)
              .do (() => {
                /* Re-read the candidates list, now we've deleted one */
                this.candidates = this.service.sonovatetestStoreReadCandidates ();
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

  isSelected (candidate: SonovatetestCandidate): boolean {
    return !!candidate && (candidate.id === this.selectedId);
  }

  add (): void {
    this.router.navigate (['/candidate', 'new']);
  }
}
