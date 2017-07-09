import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';

import { PlacementsService } from '../../api/api/api';
import { MockPlacementsService } from '../../../test/mocks/app/api/placements.service';
import { PlacementListComponent } from './placement-list.component';

describe ('PlacementListComponent', () => {
  let component: PlacementListComponent;
  let fixture: ComponentFixture<PlacementListComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [ PlacementListComponent ]
    })
      .overrideComponent (PlacementListComponent, {
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
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (PlacementListComponent);
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

    describe ('placement parameter is not set', () => {
      beforeEach (() => {
        component.onSelect (undefined);
      });

      it ('should not have called router.navigate ()', () => {
        expect (router.navigate).not.toHaveBeenCalled ();
      });
    });

    describe ('placement parameter is set', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component.onSelect ({
          id: id
        });
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/placement', id]);
      });
    });
  });

  describe ('onDelete ()', () => {
    let placementsService: MockPlacementsService;
    let dialog: MockNgbModal;
    let alerts: MockAlertsService;
    let id: number;

    beforeEach (() => {
      placementsService = component['service'] as any;
      dialog = component['dialog'] as any;
      alerts = component['alertsService'] as any;

      spyOn (dialog, 'open').and.callThrough ();
      spyOn (placementsService, 'sonovatetestStoreDeletePlacement').and.callThrough ();
      spyOn (placementsService, 'sonovatetestStoreReadPlacements').and.callThrough ();
      spyOn (alerts, 'addAlert');
    });

    describe ('placement parameter is not defined', () => {
      beforeEach (() => {
        component.onDelete (undefined);
      });

      it ('should not have called dialog.open ()', () => {
        expect (dialog.open).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreDeletePlacement ()', () => {
        expect (placementsService.sonovatetestStoreDeletePlacement).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreReadPlacements ()', () => {
        expect (placementsService.sonovatetestStoreReadPlacements).not.toHaveBeenCalled ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('placement parameter is defined', () => {
      describe ('Dialog is closed', () => {
        describe ('Delete selected', () => {
          beforeEach (() => {
            dialog.testOpenResult = true;
          });

          describe ('Delete succeeds', () => {
            beforeEach (async (() => {
              placementsService.testDeletePlacement = 'Need to return something';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeletePlacement ()', () => {
              expect (placementsService.sonovatetestStoreDeletePlacement).toHaveBeenCalledWith (id);
            });

            it ('should have called service.sonovatetestStoreReadPlacements ()', () => {
              expect (placementsService.sonovatetestStoreReadPlacements).toHaveBeenCalled ();
            });

            it ('should not have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).not.toHaveBeenCalled ();
            });
          });

          describe ('Delete fails', () => {
            beforeEach (async (() => {
              placementsService.testDeletePlacementError = 'Error';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeletePlacement ()', () => {
              expect (placementsService.sonovatetestStoreDeletePlacement).toHaveBeenCalledWith (id);
            });

            it ('should not have called service.sonovatetestStoreReadPlacements ()', () => {
              expect (placementsService.sonovatetestStoreReadPlacements).not.toHaveBeenCalled ();
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

          it ('should not have called service.sonovatetestStoreDeletePlacement ()', () => {
            expect (placementsService.sonovatetestStoreDeletePlacement).not.toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreReadPlacements ()', () => {
            expect (placementsService.sonovatetestStoreReadPlacements).not.toHaveBeenCalled ();
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

        it ('should not have called service.sonovatetestStoreDeletePlacement ()', () => {
          expect (placementsService.sonovatetestStoreDeletePlacement).not.toHaveBeenCalled ();
        });

        it ('should not have called service.sonovatetestStoreReadPlacements ()', () => {
          expect (placementsService.sonovatetestStoreReadPlacements).not.toHaveBeenCalled ();
        });

        it ('should not have called alertsService.addAlert ()', () => {
          expect (alerts.addAlert).not.toHaveBeenCalled ();
        });
      });
    });
  });

  describe ('isSelected ()', () => {
    describe ('placement parameter is not defined', () => {
      it ('should return falsey', () => {
        expect (component.isSelected (undefined)).toBeFalsy ();
      });
    });

    describe ('placement parameter is defined', () => {
      let selectedId: number;

      beforeEach (() => {
        selectedId = 234;

        component['selectedId'] = selectedId;
      });

      describe ('placement ID does not equal selectedId', () => {
        it ('should return falsey', () => {
          expect (component.isSelected ({
            id: selectedId + 1
          })).toBeFalsy ();
        });
      });

      describe ('placement ID does equal selectedId', () => {
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
      expect (router.navigate).toHaveBeenCalledWith (['/placement', 'new']);
    });
  });
});
