import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { SonovatetestCandidate } from '../../api/model/models';
import { CandidatesService } from '../../api/api/api';
import { AreYouSureDiscardDialogComponent } from '../../are-you-sure-discard-dialog/are-you-sure-discard-dialog.component';
import { NeedsBlurDirective } from '../../needs-blur.directive';
import { AlertsService } from '../../alerts.service';

@Component ({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnInit, OnDestroy {
  @ViewChildren (NeedsBlurDirective) private needsBlur: QueryList<NeedsBlurDirective>;

  public candidateForm: FormGroup;

  /* See https://stackoverflow.com/a/41177163 for subscribe cleanup */
  private ngUnsubscribe: Subject<void> = new Subject<void> ();
  public candidate: SonovatetestCandidate;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private service: CandidatesService,
               private formBuilder: FormBuilder,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
    this.createForm ();
  }

  createForm () {
    this.candidateForm = this.formBuilder.group ({
      id: 0,
      name: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit () {
    this.route.data
      .takeUntil (this.ngUnsubscribe)
      .subscribe ((data: {
        candidate: SonovatetestCandidate
      }) => {
        this.candidate = data.candidate;

        this.setFormModel ();
      });
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next ();
    this.ngUnsubscribe.complete ();
  }

  setFormModel () {
    if (!this.candidate) {
      return;
    }

    this.candidateForm.reset ({
      id: this.candidate.id,
      name: this.candidate.name
    });
  }

  getFormModel (): SonovatetestCandidate {
    const val = this.candidateForm.value;
    return {
      id: val.id,
      name: val.name
    };
  }

  save () {
    if (!this.candidateForm.dirty ||
        !this.candidate) {
      /* No need to do anything if nothing has changed */
      this.gotoCandidates ();
    } else {
      this.service.sonovatetestStoreUpdateCandidate (this.candidate.id,
                                                     this.getFormModel ())
        .take (1)
        .do (() => {
          /* Need to reset the form, otherwise the canDeactivate ()
           * check will see the dirty entries and ask if we're sure
           */
          this.candidateForm.reset ();

          this.gotoCandidates ();
        })
        .catch (error => {
          this.alertsService.addAlert (`Update error: ${error.statusText || 'Unknown error'}`);
          return Observable.of<SonovatetestCandidate> (null);
        })
        .subscribe ();
    }
  }

  revert () {
    this.setFormModel ();
  }

  cancel () {
    this.gotoCandidates ();
  }

  canDeactivate (): Observable<boolean> | Promise<boolean> | boolean {
    /* Make sure no form control has focus.  Works around
     * https://github.com/ng-bootstrap/ng-bootstrap/issues/1252
     */
    if (this.needsBlur) {
      this.needsBlur.forEach (elt => {
        elt.blur ();
      });
    }

    /* Check if form is pristine */
    if (!this.candidateForm.dirty) {
      return true;
    }

    return this.dialog.open (AreYouSureDiscardDialogComponent).result
      .then ((result) => {
        return result;
      })
      .catch (err => {
        return false;
      });
  }

  gotoCandidates (): void {
    const candidateId = this.candidate ? this.candidate.id : null;

    this.router.navigate (['/candidates', {
      id: candidateId
    }]);
  }
}
