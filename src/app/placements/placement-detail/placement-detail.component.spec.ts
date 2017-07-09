import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';
import { PlacementsService, CandidatesService, ClientsService } from '../../api/api/api';
import { MockPlacementsService } from '../../../test/mocks/app/api/placements.service';
import { MockCandidatesService } from '../../../test/mocks/app/api/candidates.service';
import { MockClientsService } from '../../../test/mocks/app/api/clients.service';
import { SonovatetestPlacement } from '../../api/model/models';

import { NeedsBlurDirective } from '../../needs-blur.directive';
import { PlacementDetailComponent } from './placement-detail.component';

describe ('PlacementDetailComponent', () => {
  let component: PlacementDetailComponent;
  let fixture: ComponentFixture<PlacementDetailComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [
        PlacementDetailComponent,
        NeedsBlurDirective
      ]
    })
      .overrideComponent (PlacementDetailComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }, {
            provide: NgbModal,
            useClass: MockNgbModal
          }, {
            provide: PlacementsService,
            useClass: MockPlacementsService
          }, {
            provide: CandidatesService,
            useClass: MockCandidatesService
          }, {
            provide: ClientsService,
            useClass: MockClientsService
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (PlacementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should be created', () => {
    expect (component).toBeTruthy ();
  });

  describe ('setFormModel ()', () => {
    let form: FormGroup;

    beforeEach (() => {
      form = component['placementForm'];

      spyOn (form, 'reset');
    });

    describe ('placement does not exist', () => {
      beforeEach (() => {
        component['placement'] = null;

        component.setFormModel ();
      });

      it ('should have called placementForm.reset ()', () => {
        expect (form.reset).toHaveBeenCalled ();
      });
    });

    describe ('placement exists', () => {
      beforeEach (() => {
        component['placement'] = {
          startdate: 123,
          enddate: 234
        };
      });

      describe ('placement.startdate is not set', () => {
        beforeEach (() => {
          component['placement'].startdate = 0;

          component.setFormModel ();
        });

        it ('should have called placementForm.reset () with a null start date', () => {
          expect (form.reset).toHaveBeenCalledWith (jasmine.objectContaining ({
            startdate: null
          }));
        });
      });

      describe ('placement.startdate is set', () => {
        beforeEach (() => {
          component.setFormModel ();
        });

        it ('should have called placementForm.reset () with a start date model', () => {
          expect (form.reset).toHaveBeenCalledWith (jasmine.objectContaining ({
            startdate: jasmine.any (Object)
          }));
        });
      });

      describe ('placement.enddate is not set', () => {
        beforeEach (() => {
          component['placement'].enddate = 0;

          component.setFormModel ();
        });

        it ('should have called placementForm.reset () with a null end date', () => {
          expect (form.reset).toHaveBeenCalledWith (jasmine.objectContaining ({
            enddate: null
          }));
        });
      });

      describe ('placement.enddate is set', () => {
        beforeEach (() => {
          component.setFormModel ();
        });

        it ('should have called placementForm.reset () with an end date model', () => {
          expect (form.reset).toHaveBeenCalledWith (jasmine.objectContaining ({
            enddate: jasmine.any (Object)
          }));
        });
      });
    });
  });

  describe ('getFormModel ()', () => {
    let ret: SonovatetestPlacement;

    beforeEach (() => {
      component['placementForm'].value.startdate = {
        year: 2017,
        month: 7,
        day: 1
      };
      component['placementForm'].value.enddate = {
        year: 2017,
        month: 7,
        day: 31
      };
    });

    it ('should return a SonovatetestPlacement', () => {
      expect (component.getFormModel ()).toEqual (jasmine.objectContaining ({
        jobtitle: jasmine.any (String)
      }));
    });

    describe ('start date has not been chosen', () => {
      beforeEach (() => {
        component['placementForm'].value.startdate = null;

        ret = component.getFormModel ();
      });

      it ('should return a SonovatetestPlacement with a startdate of zero', () => {
        expect (ret.startdate).toEqual (0);
      });
    });

    describe ('start date has been chosen', () => {
      beforeEach (() => {
        ret = component.getFormModel ();
      });

      it ('should return a SonovatetestPlacement with a startdate greater than zero', () => {
        expect (ret.startdate).toBeGreaterThan (0);
      });
    });

    describe ('end date has not been chosen', () => {
      beforeEach (() => {
        component['placementForm'].value.enddate = null;

        ret = component.getFormModel ();
      });

      it ('should return a SonovatetestPlacement with an enddate of zero', () => {
        expect (ret.enddate).toEqual (0);
      });
    });

    describe ('end date has been chosen', () => {
      beforeEach (() => {
        ret = component.getFormModel ();
      });

      it ('should return a SonovatetestPlacement with an enddate greater than zero', () => {
        expect (ret.enddate).toBeGreaterThan (0);
      });
    });
  });

  describe ('save ()', () => {
    let placementsService: MockPlacementsService;
    let form: FormGroup;
    let alerts: MockAlertsService;

    beforeEach (() => {
      placementsService = component['placementsService'] as any;
      form = component['placementForm'];
      alerts = component['alertsService'] as any;

      spyOn (component, 'gotoPlacements');
      spyOn (placementsService, 'sonovatetestStoreUpdatePlacement').and.callThrough ();
      spyOn (placementsService, 'sonovatetestStoreCreatePlacement').and.callThrough ();
    });

    describe ('mode is \'edit\' and placement does not exist', () => {
      beforeEach (() => {
        component['mode'] = 'edit';
        form.get ('jobtitle').markAsDirty ();

        component.save ();
      });

      it ('should have called gotoPlacements ()', () => {
        expect (component.gotoPlacements).toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreUpdatePlacement ()', () => {
        expect (placementsService.sonovatetestStoreUpdatePlacement).not.toHaveBeenCalled ();
      });
    });

    describe ('placement does exist', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component['placement'] = {
          id: id
        };
      });

      describe ('form is not dirty', () => {
        beforeEach (() => {
          form.get ('jobtitle').markAsPristine ();

          component.save ();
        });

        it ('should have called gotoPlacements ()', () => {
          expect (component.gotoPlacements).toHaveBeenCalled ();
        });

        it ('should not have called service.sonovatetestStoreUpdatePlacement ()', () => {
          expect (placementsService.sonovatetestStoreUpdatePlacement).not.toHaveBeenCalled ();
        });
      });

      describe ('form is dirty', () => {
        beforeEach (() => {
          form.get ('jobtitle').markAsDirty ();
        });

        describe ('mode is \'edit\'', () => {
          beforeEach (() => {
            component['mode'] = 'edit';
          });

          describe ('gotoList parameter is true', () => {
            beforeEach (() => {
              form.get ('jobtitle').markAsDirty ();

              placementsService.testUpdatePlacement = {};

              spyOn (form, 'reset');
              spyOn (alerts, 'addAlert');

              component.save ();
            });

            it ('should have called gotoPlacements ()', () => {
              expect (component.gotoPlacements).toHaveBeenCalled ();
            });

            it ('should have called placementForm.reset ()', () => {
              expect (form.reset).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreUpdatePlacement ()', () => {
              expect (placementsService.sonovatetestStoreUpdatePlacement).toHaveBeenCalled ();
            });

            it ('should not have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).not.toHaveBeenCalled ();
            });
          });

          describe ('update error', () => {
            beforeEach (() => {
              form.get ('jobtitle').markAsDirty ();

              placementsService.testUpdatePlacementError = 'Error';

              spyOn (form, 'reset');
              spyOn (alerts, 'addAlert');

              component.save ();
            });

            it ('should not have called gotoPlacements ()', () => {
              expect (component.gotoPlacements).not.toHaveBeenCalled ();
            });

            it ('should not have called placementForm.reset ()', () => {
              expect (form.reset).not.toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreUpdatePlacement ()', () => {
              expect (placementsService.sonovatetestStoreUpdatePlacement).toHaveBeenCalled ();
            });

            it ('should have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).toHaveBeenCalled ();
            });
          });
        });

        describe ('mode is \'add\'', () => {
          beforeEach (() => {
            component['mode'] = 'add';
          });

          describe ('gotoList parameter is false', () => {
            beforeEach (() => {
              form.get ('jobtitle').markAsDirty ();

              placementsService.testCreatePlacement = {};

              spyOn (form, 'reset');
              spyOn (alerts, 'addAlert');

              component.save (false);
            });

            it ('should not have called gotoPlacements ()', () => {
              expect (component.gotoPlacements).not.toHaveBeenCalled ();
            });

            it ('should have called placementForm.reset ()', () => {
              expect (form.reset).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreCreatePlacement ()', () => {
              expect (placementsService.sonovatetestStoreCreatePlacement).toHaveBeenCalled ();
            });

            it ('should not have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).not.toHaveBeenCalled ();
            });
          });

          describe ('update error', () => {
            beforeEach (() => {
              form.get ('jobtitle').markAsDirty ();

              placementsService.testCreatePlacementError = 'Error';

              spyOn (form, 'reset');
              spyOn (alerts, 'addAlert');

              component.save (false);
            });

            it ('should not have called gotoPlacements ()', () => {
              expect (component.gotoPlacements).not.toHaveBeenCalled ();
            });

            it ('should not have called placementForm.reset ()', () => {
              expect (form.reset).not.toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreCreatePlacement ()', () => {
              expect (placementsService.sonovatetestStoreCreatePlacement).toHaveBeenCalled ();
            });

            it ('should have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).toHaveBeenCalled ();
            });
          });
        });

        describe ('mode is bogus', () => {
          beforeEach (() => {
            component['mode'] = 'bogus';

            form.get ('jobtitle').markAsDirty ();

            spyOn (form, 'reset');
            spyOn (alerts, 'addAlert');

            component.save ();
          });

          it ('should have called gotoPlacements ()', () => {
            expect (component.gotoPlacements).toHaveBeenCalled ();
          });

          it ('should not have called placementForm.reset ()', () => {
            expect (form.reset).not.toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreCreatePlacement ()', () => {
            expect (placementsService.sonovatetestStoreCreatePlacement).not.toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreUpdatePlacement ()', () => {
            expect (placementsService.sonovatetestStoreUpdatePlacement).not.toHaveBeenCalled ();
          });

          it ('should not have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).not.toHaveBeenCalled ();
          });
        });
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
      spyOn (component, 'gotoPlacements');

      component.cancel ();
    });

    it ('should have called gotoPlacements ()', () => {
      expect (component.gotoPlacements).toHaveBeenCalled ();
    });
  });

  describe ('canDeactivate ()', () => {
    let form: FormGroup;
    let dialog: MockNgbModal;
    let id: number;

    beforeEach (() => {
      form = component['placementForm'];
      dialog = component['dialog'] as any;
      id = 123;

      component['placement'] = {
        id: id
      };

      /* Make sure the placement is set and the NeedsBlurDirective
       * ViewChildren property has noticed, otherwise the needsBlur
       * forEach will only have zero elements
       */
      fixture.detectChanges ();

      spyOn (dialog, 'open').and.callThrough ();
    });

    describe ('form is not dirty', () => {
      beforeEach (() => {
        /* Make sure form element blurring can cope if no elements are
         * marked up
         */
        component['needsBlur'] = null;
        form.get ('jobtitle').markAsPristine ();
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
        form.get ('jobtitle').markAsDirty ();
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

  describe ('generateTimesheets ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');
    });

    describe ('placement does not exist', () => {
      beforeEach (() => {
        component['placement'] = null;

        component.generateTimesheets ();
      });

      it ('should not have called router.navigate ()', () => {
        expect (router.navigate).not.toHaveBeenCalled ();
      });
    });

    describe ('placement is set', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component['placement'] = {
          id: id
        };
      });

      describe ('placement.id is not set', () => {
        beforeEach (() => {
          component['placement'].id = 0;

          component.generateTimesheets ();
        });

        it ('should not have called router.navigate ()', () => {
          expect (router.navigate).not.toHaveBeenCalled ();
        });
      });

      describe ('placement.id is set', () => {
        beforeEach (() => {
          component.generateTimesheets ();
        });

        it ('should have called router.navigate ()', () => {
          expect (router.navigate).toHaveBeenCalledWith (['/placement', id, 'timesheets']);
        });
      });
    });
  });

  describe ('gotoPlacements ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');
    });

    describe ('placement does not exist', () => {
      beforeEach (() => {
        component['placement'] = null;

        component.gotoPlacements ();
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/placements', {
          id: null
        }]);
      });
    });

    describe ('placement exists', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component['placement'] = {
          id: id
        };

        component.gotoPlacements ();
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/placements', {
          id: id
        }]);
      });
    });
  });
});
