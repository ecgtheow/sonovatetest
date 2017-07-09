import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { SonovatetestClient } from '../../api/model/models';
import { ClientsService } from '../../api/api/api';
import { AreYouSureDiscardDialogComponent } from '../../are-you-sure-discard-dialog/are-you-sure-discard-dialog.component';
import { NeedsBlurDirective } from '../../needs-blur.directive';
import { AlertsService } from '../../alerts.service';

@Component ({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  @ViewChildren (NeedsBlurDirective) private needsBlur: QueryList<NeedsBlurDirective>;

  public clientForm: FormGroup;

  /* See https://stackoverflow.com/a/41177163 for subscribe cleanup */
  private ngUnsubscribe: Subject<void> = new Subject<void> ();
  public client: SonovatetestClient;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private service: ClientsService,
               private formBuilder: FormBuilder,
               private dialog: NgbModal,
               private alertsService: AlertsService) {
    this.createForm ();
  }

  createForm () {
    this.clientForm = this.formBuilder.group ({
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
        client: SonovatetestClient
      }) => {
        this.client = data.client;

        this.setFormModel ();
      });
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next ();
    this.ngUnsubscribe.complete ();
  }

  setFormModel () {
    if (!this.client) {
      return;
    }

    this.clientForm.reset ({
      id: this.client.id,
      name: this.client.name
    });
  }

  getFormModel (): SonovatetestClient {
    const val = this.clientForm.value;
    return {
      id: val.id,
      name: val.name
    };
  }

  save () {
    if (!this.clientForm.dirty ||
        !this.client) {
      /* No need to do anything if nothing has changed */
      this.gotoClients ();
    } else {
      this.service.sonovatetestStoreUpdateClient (this.client.id,
                                                  this.getFormModel ())
        .take (1)
        .do (() => {
          /* Need to reset the form, otherwise the canDeactivate ()
           * check will see the dirty entries and ask if we're sure
           */
          this.clientForm.reset ();

          this.gotoClients ();
        })
        .catch (error => {
          this.alertsService.addAlert (`Update error: ${error.statusText || 'Unknown error'}`);
          return Observable.of<SonovatetestClient> (null);
        })
        .subscribe ();
    }
  }

  revert () {
    this.setFormModel ();
  }

  cancel () {
    this.gotoClients ();
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
    if (!this.clientForm.dirty) {
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

  gotoClients (): void {
    const clientId = this.client ? this.client.id : null;

    this.router.navigate (['/clients', {
      id: clientId
    }]);
  }
}
