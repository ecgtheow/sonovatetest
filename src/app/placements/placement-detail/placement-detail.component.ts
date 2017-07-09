import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { SonovatetestPlacement, SonovatetestCandidate, SonovatetestClient } from '../../api/model/models';
import { PlacementsService, CandidatesService, ClientsService } from '../../api/api/api';
import { AreYouSureDiscardDialogComponent } from '../../are-you-sure-discard-dialog/are-you-sure-discard-dialog.component';
import { NeedsBlurDirective } from '../../needs-blur.directive';
import { AlertsService } from '../../alerts.service';

@Component ({
  selector: 'app-placement-detail',
  templateUrl: './placement-detail.component.html',
  styleUrls: ['./placement-detail.component.scss']
})
export class PlacementDetailComponent implements OnInit, OnDestroy {
  @ViewChildren (NeedsBlurDirective) private needsBlur: QueryList<NeedsBlurDirective>;

  private placementForm: FormGroup;
  private startdateModel: NgbDateStruct;
  private enddateModel: NgbDateStruct;

  /* See https://stackoverflow.com/a/41177163 for subscribe cleanup */
  private ngUnsubscribe: Subject<void> = new Subject<void> ();
  private placement: SonovatetestPlacement;
  private candidates: Observable<SonovatetestCandidate[]>;
  private clients: Observable<SonovatetestClient[]>;
  private mode: string;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private placementsService: PlacementsService,
               private candidatesService: CandidatesService,
               private clientsService: ClientsService,
               private formBuilder: FormBuilder,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
    this.createForm ();
  }

  createForm () {
    this.placementForm = this.formBuilder.group ({
      id: 0,
      jobtitle: [
        '',
        Validators.required
      ],
      startdate: null,
      enddate: null,
      placementtype: 0,
      candidateid: 0,
      clientid: 0
    });
  }

  ngOnInit () {
    this.route.data
      .takeUntil (this.ngUnsubscribe)
      .subscribe ((data: {
        placement: SonovatetestPlacement,
        mode: string
      }) => {
        this.placement = data.placement;
        this.mode = data.mode || 'edit';

        this.setFormModel ();
      });

    this.candidates = this.candidatesService.sonovatetestStoreReadCandidates ();
    this.clients = this.clientsService.sonovatetestStoreReadClients ();
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next ();
    this.ngUnsubscribe.complete ();
  }

  setFormModel () {
    const val = this.placement;

    if (val && val.startdate) {
      const startdate = moment.utc (val.startdate);
      this.startdateModel = {
        year: startdate.year (),
        month: startdate.month () + 1,
        day: startdate.date ()
      };
    } else {
      this.startdateModel = null;
    }

    if (val && val.enddate) {
      const enddate = moment.utc (val.enddate);
      this.enddateModel = {
        year: enddate.year (),
        month: enddate.month () + 1,
        day: enddate.date ()
      };
    } else {
      this.enddateModel = null;
    }

    this.placementForm.reset ({
      id: val ? val.id : 0,
      jobtitle: val ? val.jobtitle : '',
      startdate: this.startdateModel,
      enddate: this.enddateModel,
      placementtype: val ? val.placementtype : 0,
      candidateid: val ? val.candidateid : 0,
      clientid: val ? val.clientid : 0
    });
  }

  getFormModel (): SonovatetestPlacement {
    const val = this.placementForm.value;

    let startdate = 0;
    if (val.startdate) {
      startdate = +moment.utc ({
        year: val.startdate.year,
        month: val.startdate.month - 1,
        day: val.startdate.day
      });
    }

    let enddate = 0;
    if (val.enddate) {
      enddate = +moment.utc ({
        year: val.enddate.year,
        month: val.enddate.month - 1,
        day: val.enddate.day
      });
    }

    return {
      id: val.id,
      jobtitle: val.jobtitle,
      startdate: startdate,
      enddate: enddate,
      placementtype: val.placementtype,
      candidateid: val.candidateid,
      clientid: val.clientid
    };
  }

  save (gotoList = true) {
    if (!this.placementForm.dirty ||
        (this.mode === 'edit' &&
         !this.placement)) {
      /* No need to do anything if nothing has changed */
      this.gotoPlacements ();
    } else {
      let apicall: Observable<SonovatetestPlacement>;

      if (this.mode === 'edit') {
        apicall = this.placementsService.sonovatetestStoreUpdatePlacement (
          this.placement.id,
          this.getFormModel ()
        );
      } else if (this.mode === 'add') {
        apicall = this.placementsService.sonovatetestStoreCreatePlacement (this.getFormModel ())
      } else {
        console.log ('Unknown mode: ', this.mode);
        this.gotoPlacements ();

        return;
      }

      apicall.take (1)
        .do ((placement: SonovatetestPlacement) => {
          /* Need to reset the form, otherwise the canDeactivate ()
           * check will see the dirty entries and ask if we're sure
           */
          this.placement = placement;
          this.setFormModel ();

          if (gotoList) {
            this.gotoPlacements ();
          }
        })
        .catch (error => {
          this.alertsService.addAlert (`Update error: ${error.statusText || 'Unknown error'}`);
          return Observable.of<SonovatetestPlacement> (null);
        })
        .subscribe ();
    }
  }

  revert () {
    this.setFormModel ();
  }

  cancel () {
    this.gotoPlacements ();
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
    if (!this.placementForm.dirty) {
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

  generateTimesheets (): void {
    if (!this.placement ||
        !this.placement.id) {
      return;
    }

    this.router.navigate (['/placement', this.placement.id, 'timesheets']);
  }

  gotoPlacements (): void {
    const placementId = this.placement ? this.placement.id : null;

    this.router.navigate (['/placements', {
      id: placementId
    }]);
  }
}
