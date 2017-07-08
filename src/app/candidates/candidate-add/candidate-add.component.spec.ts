import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';
import { CandidatesService } from '../../api/api/api';
import { MockCandidatesService } from '../../../test/mocks/app/api/candidates.service';
import { NeedsBlurDirective } from '../../needs-blur.directive';
import { CandidateAddComponent } from './candidate-add.component';

describe ('CandidateAddComponent', () => {
  let component: CandidateAddComponent;
  let fixture: ComponentFixture<CandidateAddComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [
        CandidateAddComponent,
        NeedsBlurDirective
      ]
    })
      .overrideComponent (CandidateAddComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }, {
            provide: CandidatesService,
            useClass: MockCandidatesService
          }, {
            provide: NgbModal,
            useClass: MockNgbModal
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (CandidateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should be created', () => {
    expect (component).toBeTruthy ();
  });

  describe ('setFormModel ()', () => {
    let form: FormGroup;

    beforeEach (() => {
      form = component['candidateForm'];

      spyOn (form, 'reset');

      component.setFormModel ();
    });

    it ('should have called candidateForm.reset ()', () => {
      expect (form.reset).toHaveBeenCalled ();
    });
  });

  describe ('getFormModel ()', () => {
    it ('should return a SonovatetestCandidate', () => {
      expect (component.getFormModel ()).toEqual (jasmine.objectContaining ({
        name: jasmine.any (String)
      }));
    });
  });

  describe ('save ()', () => {
    let candidatesService: MockCandidatesService;
    let form: FormGroup;
    let alerts: MockAlertsService;

    beforeEach (() => {
      candidatesService = component['service'] as any;
      form = component['candidateForm'];
      alerts = component['alertsService'] as any;

      spyOn (component, 'gotoCandidates');
      spyOn (candidatesService, 'sonovatetestStoreCreateCandidate').and.callThrough ();
    });

    describe ('form is not dirty', () => {
      beforeEach (() => {
        form.get ('name').markAsPristine ();

        component.save ();
      });

      it ('should have called gotoCandidates ()', () => {
        expect (component.gotoCandidates).toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreCreateCandidate ()', () => {
        expect (candidatesService.sonovatetestStoreCreateCandidate).not.toHaveBeenCalled ();
      });
    });

    describe ('form is dirty', () => {
      beforeEach (() => {
        form.get ('name').markAsDirty ();

        candidatesService.testCreateCandidate = {};

        spyOn (form, 'reset');
        spyOn (alerts, 'addAlert');

        component.save ();
      });

      it ('should have called gotoCandidates ()', () => {
        expect (component.gotoCandidates).toHaveBeenCalled ();
      });

      it ('should have called candidateForm.reset ()', () => {
        expect (form.reset).toHaveBeenCalled ();
      });

      it ('should have called service.sonovatetestStoreCreateCandidate ()', () => {
        expect (candidatesService.sonovatetestStoreCreateCandidate).toHaveBeenCalled ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('create error', () => {
      beforeEach (() => {
        form.get ('name').markAsDirty ();

        candidatesService.testCreateCandidateError = 'Error';

        spyOn (form, 'reset');
        spyOn (alerts, 'addAlert');

        component.save ();
      });

      it ('should not have called gotoCandidates ()', () => {
        expect (component.gotoCandidates).not.toHaveBeenCalled ();
      });

      it ('should not have called candidateForm.reset ()', () => {
        expect (form.reset).not.toHaveBeenCalled ();
      });

      it ('should have called service.sonovatetestStoreCreateCandidate ()', () => {
        expect (candidatesService.sonovatetestStoreCreateCandidate).toHaveBeenCalled ();
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
      spyOn (component, 'gotoCandidates');

      component.cancel ();
    });

    it ('should have called gotoCandidates ()', () => {
      expect (component.gotoCandidates).toHaveBeenCalled ();
    });
  });

  describe ('canDeactivate ()', () => {
    let form: FormGroup;
    let dialog: MockNgbModal;

    beforeEach (() => {
      form = component['candidateForm'];
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

  describe ('gotoCandidates ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');

      component.gotoCandidates ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/candidates']);
    });
  });
});
