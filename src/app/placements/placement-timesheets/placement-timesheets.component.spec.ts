import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';
import { PlacementTimesheetsComponent } from './placement-timesheets.component';

describe ('PlacementTimesheetsComponent', () => {
  let component: PlacementTimesheetsComponent;
  let fixture: ComponentFixture<PlacementTimesheetsComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        PlacementTimesheetsComponent
      ]
    })
      .overrideComponent (PlacementTimesheetsComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (PlacementTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should be created', () => {
    expect (component).toBeTruthy ();
  });

  describe ('generateTimesheets ()', () => {
    let alerts: MockAlertsService;

    beforeEach (() => {
      alerts = component['alertsService'] as any;

      spyOn (alerts, 'addAlert');
    });

    describe ('placement is not set', () => {
      beforeEach (() => {
        component['placement'] = null;

        component.generateTimesheets ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('placement is set', () => {
      beforeEach (() => {
        component['placement'] = {
          startdate: +moment.utc ('2017-07-01'),
          enddate: +moment.utc ('2017-08-31'),
          placementtype: 0
        };
      });

      describe ('candidate is not set', () => {
        beforeEach (() => {
          component['client'] = {};

          component.generateTimesheets ();
        });

        it ('should have called alertsService.addAlert ()', () => {
          expect (alerts.addAlert).toHaveBeenCalled ();
        });
      });

      describe ('client is not set', () => {
        beforeEach (() => {
          component['candidate'] = {};

          component.generateTimesheets ();
        });

        it ('should have called alertsService.addAlert ()', () => {
          expect (alerts.addAlert).toHaveBeenCalled ();
        });
      });

      describe ('candidate and client are both set', () => {
        beforeEach (() => {
          component['candidate'] = {
          };
          component['client'] = {
          };
        });

        describe ('placement.startdate is not set', () => {
          beforeEach (() => {
            component['placement'].startdate = 0;

            component.generateTimesheets ();
          });

          it ('should have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).toHaveBeenCalled ();
          });
        });

        describe ('placement.enddate is not set', () => {
          beforeEach (() => {
            component['placement'].enddate = 0;

            component.generateTimesheets ();
          });

          it ('should have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).toHaveBeenCalled ();
          });
        });

        describe ('placement.startdate > placement.enddate', () => {
          beforeEach (() => {
            component['placement'].startdate = component['placement'].enddate + 1;

            component.generateTimesheets ();
          });

          it ('should have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).toHaveBeenCalled ();
          });
        });

        describe ('placement.placementtype is invalid', () => {
          beforeEach (() => {
            component['placement'].placementtype = 3;

            component.generateTimesheets ();
          });

          it ('should have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).toHaveBeenCalled ();
          });
        });

        describe ('All required settings are present', () => {
          describe ('placementtype is \'Weekly\'', () => {
            beforeEach (() => {
              component['placement'].placementtype = 0;

              component.generateTimesheets ();
            });

            it ('should have generated 10 timesheets', () => {
              expect (component['sheets'].length).toEqual (10);
            });
          });

          describe ('placement type is \'Monthly\'', () => {
            beforeEach (() => {
              component['placement'].placementtype = 1;

              component.generateTimesheets ();
            });

            it ('should have generated 2 timesheets', () => {
              expect (component['sheets'].length).toEqual (2);
            });
          });
        });
      });
    });
  });

  describe ('done ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');
    });

    describe ('placement does not exist', () => {
      beforeEach (() => {
        component['placement'] = null;

        component.done ();
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

        component.done ();
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/placements', {
          id: id
        }]);
      });
    });
  });
});
