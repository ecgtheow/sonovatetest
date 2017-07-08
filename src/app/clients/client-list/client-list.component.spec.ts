import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockNgbModal } from '../../../test/mocks/third-party/ng-bootstrap/modal';

import { AlertsService } from '../../alerts.service';
import { MockAlertsService } from '../../../test/mocks/app/alerts.service';

import { ClientsService } from '../../api/api/api';
import { MockClientsService } from '../../../test/mocks/app/api/clients.service';
import { ClientListComponent } from './client-list.component';

describe ('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [ ClientListComponent ]
    })
      .overrideComponent (ClientListComponent, {
        set: {
          providers: [{
            provide: AlertsService,
            useClass: MockAlertsService
          }, {
            provide: NgbModal,
            useClass: MockNgbModal
          }, {
            provide: ClientsService,
            useClass: MockClientsService
          }]
        }
      })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (ClientListComponent);
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

    describe ('client parameter is not set', () => {
      beforeEach (() => {
        component.onSelect (undefined);
      });

      it ('should not have called router.navigate ()', () => {
        expect (router.navigate).not.toHaveBeenCalled ();
      });
    });

    describe ('client parameter is set', () => {
      let id: number;

      beforeEach (() => {
        id = 123;

        component.onSelect ({
          id: id
        });
      });

      it ('should have called router.navigate ()', () => {
        expect (router.navigate).toHaveBeenCalledWith (['/client', id]);
      });
    });
  });

  describe ('onDelete ()', () => {
    let clientsService: MockClientsService;
    let dialog: MockNgbModal;
    let alerts: MockAlertsService;
    let id: number;

    beforeEach (() => {
      clientsService = component['service'] as any;
      dialog = component['dialog'] as any;
      alerts = component['alertsService'] as any;

      spyOn (dialog, 'open').and.callThrough ();
      spyOn (clientsService, 'sonovatetestStoreDeleteClient').and.callThrough ();
      spyOn (clientsService, 'sonovatetestStoreReadClients').and.callThrough ();
      spyOn (alerts, 'addAlert');
    });

    describe ('client parameter is not defined', () => {
      beforeEach (() => {
        component.onDelete (undefined);
      });

      it ('should not have called dialog.open ()', () => {
        expect (dialog.open).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreDeleteClient ()', () => {
        expect (clientsService.sonovatetestStoreDeleteClient).not.toHaveBeenCalled ();
      });

      it ('should not have called service.sonovatetestStoreReadClients ()', () => {
        expect (clientsService.sonovatetestStoreReadClients).not.toHaveBeenCalled ();
      });

      it ('should not have called alertsService.addAlert ()', () => {
        expect (alerts.addAlert).not.toHaveBeenCalled ();
      });
    });

    describe ('client parameter is defined', () => {
      describe ('Dialog is closed', () => {
        describe ('Delete selected', () => {
          beforeEach (() => {
            dialog.testOpenResult = true;
          });

          describe ('Delete succeeds', () => {
            beforeEach (async (() => {
              clientsService.testDeleteClient = 'Need to return something';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeleteClient ()', () => {
              expect (clientsService.sonovatetestStoreDeleteClient).toHaveBeenCalledWith (id);
            });

            it ('should have called service.sonovatetestStoreReadClients ()', () => {
              expect (clientsService.sonovatetestStoreReadClients).toHaveBeenCalled ();
            });

            it ('should not have called alertsService.addAlert ()', () => {
              expect (alerts.addAlert).not.toHaveBeenCalled ();
            });
          });

          describe ('Delete fails', () => {
            beforeEach (async (() => {
              clientsService.testDeleteClientError = 'Error';
              id = 123;

              component.onDelete ({
                id: id
              });
            }));

            it ('should have called dialog.open ()', () => {
              expect (dialog.open).toHaveBeenCalled ();
            });

            it ('should have called service.sonovatetestStoreDeleteClient ()', () => {
              expect (clientsService.sonovatetestStoreDeleteClient).toHaveBeenCalledWith (id);
            });

            it ('should not have called service.sonovatetestStoreReadClients ()', () => {
              expect (clientsService.sonovatetestStoreReadClients).not.toHaveBeenCalled ();
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

          it ('should not have called service.sonovatetestStoreDeleteClient ()', () => {
            expect (clientsService.sonovatetestStoreDeleteClient).not.toHaveBeenCalled ();
          });

          it ('should not have called service.sonovatetestStoreReadClients ()', () => {
            expect (clientsService.sonovatetestStoreReadClients).not.toHaveBeenCalled ();
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

        it ('should not have called service.sonovatetestStoreDeleteClient ()', () => {
          expect (clientsService.sonovatetestStoreDeleteClient).not.toHaveBeenCalled ();
        });

        it ('should not have called service.sonovatetestStoreReadClients ()', () => {
          expect (clientsService.sonovatetestStoreReadClients).not.toHaveBeenCalled ();
        });

        it ('should not have called alertsService.addAlert ()', () => {
          expect (alerts.addAlert).not.toHaveBeenCalled ();
        });
      });
    });
  });

  describe ('isSelected ()', () => {
    describe ('client parameter is not defined', () => {
      it ('should return falsey', () => {
        expect (component.isSelected (undefined)).toBeFalsy ();
      });
    });

    describe ('client parameter is defined', () => {
      let selectedId: number;

      beforeEach (() => {
        selectedId = 234;

        component['selectedId'] = selectedId;
      });

      describe ('client ID does not equal selectedId', () => {
        it ('should return falsey', () => {
          expect (component.isSelected ({
            id: selectedId + 1
          })).toBeFalsy ();
        });
      });

      describe ('client ID does equal selectedId', () => {
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
      expect (router.navigate).toHaveBeenCalledWith (['/client', 'new']);
    });
  });
});
