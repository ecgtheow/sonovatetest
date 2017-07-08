import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';

import { CandidatesService } from '../../api/api/api';
import { MockCandidatesService } from '../../../test/mocks/app/api/candidates.service';
import { CandidateListComponent } from './candidate-list.component';

describe ('CandidateListComponent', () => {
  let component: CandidateListComponent;
  let fixture: ComponentFixture<CandidateListComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [ CandidateListComponent ]
    })
      .overrideComponent (CandidateListComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }, {
            provide: NgbModal,
            useClass: MockNgbModal
          }, {
            provide: CandidatesService,
            useClass: MockCandidatesService
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (CandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should be created', () => {
    expect (component).toBeTruthy ();
  });

  describe ('onSelect ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');
    });

    describe ('candidate parameter is not set', () => {
      beforeEach (() => {
        component.onSelect (undefined);
      });

      it ('should not have called router.navigate ()', () => {
        expect (router.navigate).not.toHaveBeenCalled ();
      });
    });

    describe ('candidate parameter is set', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component.onSelect ({
          id: id
        });
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/candidate', id]);
      });
    });
  });

  describe ('onDelete ()', () => {
    let candidatesService: MockCandidatesService;
    let dialog: MockNgbModal;
    let alerts: MockAlertsService;
    let id: number;

    beforeEach (() => {
      candidatesService = component['service'] as any;
      dialog = component['dialog'] as any;
      alerts = component['alertsService'] as any;

      spyOn (dialog, 'open').and.callThrough ();
      spyOn (candidatesService, 'sonovatetestStoreDeleteCandidate').and.callThrough ();
      spyOn (candidatesService, 'sonovatetestStoreReadCandidates').and.callThrough ();
      spyOn (alerts, 'addAlert');
    });

    describe ('candidate parameter is not defined', () => {
      beforeEach (() => {
        component.onDelete (undefined);
      });

      it ('should not have called dialog.open ()', () => {
        expect (dialog.open).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreDeleteCandidate ()', () => {
        expect (candidatesService.sonovatetestStoreDeleteCandidate).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreReadCandidates ()', () => {
        expect (candidatesService.sonovatetestStoreReadCandidates).not.toHaveBeenCalled ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('candidate parameter is defined', () => {
      describe ('Dialog is closed', () => {
        describe ('Delete selected', () => {
          beforeEach (() => {
            dialog.testOpenResult = true;
          });

          describe ('Delete succeeds', () => {
            beforeEach (async (() => {
              candidatesService.testDeleteCandidate = 'Need to return something';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeleteCandidate ()', () => {
              expect (candidatesService.sonovatetestStoreDeleteCandidate).toHaveBeenCalledWith (id);
            });

            it ('should have called service.sonovatetestStoreReadCandidates ()', () => {
              expect (candidatesService.sonovatetestStoreReadCandidates).toHaveBeenCalled ();
            });

            it ('should not have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).not.toHaveBeenCalled ();
            });
          });

          describe ('Delete fails', () => {
            beforeEach (async (() => {
              candidatesService.testDeleteCandidateError = 'Error';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeleteCandidate ()', () => {
              expect (candidatesService.sonovatetestStoreDeleteCandidate).toHaveBeenCalledWith (id);
            });

            it ('should not have called service.sonovatetestStoreReadCandidates ()', () => {
              expect (candidatesService.sonovatetestStoreReadCandidates).not.toHaveBeenCalled ();
            });

            it ('should have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).toHaveBeenCalled ();
            });
          });
        });

        describe ('Cancel selected', () => {
          beforeEach (async (() => {
            dialog.testOpenResult = false;

            id = 123;

            component.onDelete ({
              id: id
            });
          }));

          it ('should have called dialog.open ()', () => {
            expect (dialog.open).toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreDeleteCandidate ()', () => {
            expect (candidatesService.sonovatetestStoreDeleteCandidate).not.toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreReadCandidates ()', () => {
            expect (candidatesService.sonovatetestStoreReadCandidates).not.toHaveBeenCalled ();
          });

          it ('should not have called alertsService.addAlert ()', () => {
            expect (alerts.addAlert).not.toHaveBeenCalled ();
          });
        });
      });

      describe ('Dialog is dismissed', () => {
        beforeEach (async (() => {
          dialog.testOpenError = true;

          id = 123;

          component.onDelete ({
            id: id
          });
        }));

        it ('should have called dialog.open ()', () => {
          expect (dialog.open).toHaveBeenCalled ();
        });

        it ('should not have called service.sonovatetestStoreDeleteCandidate ()', () => {
          expect (candidatesService.sonovatetestStoreDeleteCandidate).not.toHaveBeenCalled ();
        });

        it ('should not have called service.sonovatetestStoreReadCandidates ()', () => {
          expect (candidatesService.sonovatetestStoreReadCandidates).not.toHaveBeenCalled ();
        });

        it ('should not have called alertsService.addAlert ()', () => {
          expect (alerts.addAlert).not.toHaveBeenCalled ();
        });
      });
    });
  });

  describe ('isSelected ()', () => {
    describe ('candidate parameter is not defined', () => {
      it ('should return falsey', () => {
        expect (component.isSelected (undefined)).toBeFalsy ();
      });
    });

    describe ('candidate parameter is defined', () => {
      let selectedId: number;

      beforeEach (() => {
        selectedId = 234;

        component['selectedId'] = selectedId;
      });

      describe ('candidate ID does not equal selectedId', () => {
        it ('should return falsey', () => {
          expect (component.isSelected ({
            id: selectedId + 1
          })).toBeFalsy ();
        });
      });

      describe ('candidate ID does equal selectedId', () => {
        it ('should return truthy', () => {
          expect (component.isSelected ({
            id: selectedId
          })).toBeTruthy ();
        });
      });
    });
  });

  describe ('add ()', () => {
    let router: Router;

    beforeEach (() => {
      router = component['router'];

      spyOn (router, 'navigate');

      component.add ();
    });

    it ('should have called router.navigate ()', () => {
      expect (router.navigate).toHaveBeenCalledWith (['/candidate', 'new']);
    });
  });
});
