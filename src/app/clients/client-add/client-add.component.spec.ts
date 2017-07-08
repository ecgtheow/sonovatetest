import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';
import { ClientsService } from '../../api/api/api';
import { MockClientsService } from '../../../test/mocks/app/api/clients.service';
import { NeedsBlurDirective } from '../../needs-blur.directive';
import { ClientAddComponent } from './client-add.component';

describe ('ClientAddComponent', () => {
  let component: ClientAddComponent;
  let fixture: ComponentFixture<ClientAddComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [
        ClientAddComponent,
        NeedsBlurDirective
      ]
    })
      .overrideComponent (ClientAddComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }, {
            provide: ClientsService,
            useClass: MockClientsService
          }, {
            provide: NgbModal,
            useClass: MockNgbModal
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (ClientAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should be created', () => {
    expect (component).toBeTruthy ();
  });

  describe ('setFormModel ()', () => {
    let form: FormGroup;

    beforeEach (() => {
      form = component['clientForm'];

      spyOn (form, 'reset');

      component.setFormModel ();
    });

    it ('should have called clientForm.reset ()', () => {
      expect (form.reset).toHaveBeenCalled ();
    });
  });

  describe ('getFormModel ()', () => {
    it ('should return a SonovatetestClient', () => {
      expect (component.getFormModel ()).toEqual (jasmine.objectContaining ({
        name: jasmine.any (String)
      }));
    });
  });

  describe ('save ()', () => {
    let clientsService: MockClientsService;
    let form: FormGroup;
    let alerts: MockAlertsService;

    beforeEach (() => {
      clientsService = component['service'] as any;
      form = component['clientForm'];
      alerts = component['alertsService'] as any;

      spyOn (component, 'gotoClients');
      spyOn (clientsService, 'sonovatetestStoreCreateClient').and.callThrough ();
    });

    describe ('form is not dirty', () => {
      beforeEach (() => {
        form.get ('name').markAsPristine ();

        component.save ();
      });

      it ('should have called gotoClients ()', () => {
        expect (component.gotoClients).toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreCreateClient ()', () => {
        expect (clientsService.sonovatetestStoreCreateClient).not.toHaveBeenCalled ();
      });
    });

    describe ('form is dirty', () => {
      beforeEach (() => {
        form.get ('name').markAsDirty ();

        clientsService.testCreateClient = {};

        spyOn (form, 'reset');
        spyOn (alerts, 'addAlert');

        component.save ();
      });

      it ('should have called gotoClients ()', () => {
        expect (component.gotoClients).toHaveBeenCalled ();
      });

      it ('should have called clientForm.reset ()', () => {
        expect (form.reset).toHaveBeenCalled ();
      });

      it ('should have called service.sonovatetestStoreCreateClient ()', () => {
        expect (clientsService.sonovatetestStoreCreateClient).toHaveBeenCalled ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('create error', () => {
      beforeEach (() => {
        form.get ('name').markAsDirty ();

        clientsService.testCreateClientError = 'Error';

        spyOn (form, 'reset');
        spyOn (alerts, 'addAlert');

        component.save ();
      });

      it ('should not have called gotoClients ()', () => {
        expect (component.gotoClients).not.toHaveBeenCalled ();
      });

      it ('should not have called clientForm.reset ()', () => {
        expect (form.reset).not.toHaveBeenCalled ();
      });

      it ('should have called service.sonovatetestStoreCreateClient ()', () => {
        expect (clientsService.sonovatetestStoreCreateClient).toHaveBeenCalled ();
      });

      it ('should have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).toHaveBeenCalled ();
      });
    });
  });

  describe ('revert ()', () => {
    beforeEach (() => {
      spyOn (component, 'setFormModel');

      component.revert ();
    });

    it ('should have called setFormModel ()', () => {
      expect (component.setFormModel).toHaveBeenCalled ();
    });
  });

  describe ('cancel ()', () => {
    beforeEach (() => {
      spyOn (component, 'gotoClients');

      component.cancel ();
    });

    it ('should have called gotoClients ()', () => {
      expect (component.gotoClients).toHaveBeenCalled ();
    });
  });

  describe ('canDeactivate ()', () => {
    let form: FormGroup;
    let dialog: MockNgbModal;

    beforeEach (() => {
      form = component['clientForm'];
      dialog = component['dialog'] as any;

      spyOn (dialog, 'open').and.callThrough ();
    });

    describe ('form is not dirty', () => {
      beforeEach (() => {
        /* Make sure form element blurring can cope if no elements are
         * marked up
         */
        component['needsBlur'] = null;
        form.get ('name').markAsPristine ();
      });

      it ('should return true', () => {
        expect (component.canDeactivate ()).toBeTruthy ();
      });

      it ('should not have called dialog.open ()', () => {
        expect (dialog.open).not.toHaveBeenCalled ();
      });
    });

    describe ('form is dirty', () => {
      let result: boolean;

      beforeEach (() => {
        form.get ('name').markAsDirty ();
      });

      describe ('Dialog is closed', () => {
        describe ('Discard selected', () => {
          beforeEach (async (() => {
            dialog.testOpenResult = true;

            /* We know it's returning a promise, as that's what the NgbModal
             * returns from open ().result
             */
            (component.canDeactivate () as Promise<boolean>).then (r => result = r);
          }));

          it ('should return true', () => {
            expect (result).toBeTruthy ();
          });
        });

        describe ('Cancel selected', () => {
          beforeEach (async (() => {
            dialog.testOpenResult = false;

            /* We know it's returning a promise, as that's what the NgbModal
             * returns from open ().result
             */
            (component.canDeactivate () as Promise<boolean>).then (r => result = r);
          }));

          it ('should return false', () => {
            expect (result).toBeFalsy ();
          });
        });
      });

      describe ('Dialog is dismissed', () => {
        beforeEach (async (() => {
          dialog.testOpenError = true;

          /* We know it's returning a promise, as that's what the NgbModal
           * returns from open ().result
           */
          (component.canDeactivate () as Promise<boolean>).then (r => result = r);
        }));

        it ('should return false', () => {
          expect (result).toBeFalsy ();
        });
      });
    });
  });

  describe ('gotoClients ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');

      component.gotoClients ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/clients']);
    });
  });
});
