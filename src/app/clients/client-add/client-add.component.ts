import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
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
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {
  @ViewChildren (NeedsBlurDirective) private needsBlur: QueryList<NeedsBlurDirective>;

  public clientForm: FormGroup;

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
      name: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit () {
  }

  setFormModel () {
    this.clientForm.reset ({
      name: ''
    });
  }

  getFormModel (): SonovatetestClient {
    const val = this.clientForm.value;

    return {
      name: val.name
    };
  }

  save () {
    if (!this.clientForm.dirty) {
      /* No need to do anything if nothing has changed */
      this.gotoClients ();
    } else {
      this.service.sonovatetestStoreCreateClient (this.getFormModel ())
        .take (1)
        .do (() => {
          /* Need to reset the form, otherwise the canDeactivate ()
           * check will see the dirty entries and ask if we're sure
           */
          this.clientForm.reset ();

          this.gotoClients ();
        })
        .catch (error => {
          this.alertsService.addAlert (`Create error: ${error.statusText || 'Unknown error'}`);
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
    this.router.navigate (['/clients']);
  }
}
