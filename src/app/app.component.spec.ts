import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertsService } from './alerts.service';
import { MockAlertsService } from '../test/mocks/app/alerts.service';

import { AppComponent } from './app.component';

describe ('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot ()
      ],
      declarations: [
        AppComponent
      ],
    })
      .overrideComponent (AppComponent, {
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
    fixture = TestBed.createComponent (AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  describe ('getAlerts ()', () => {
    let alertHandler: MockAlertsService;
    let alertsLength: number;

    beforeEach (() => {
      alertsLength = component['alerts'].length;
      alertHandler = fixture.debugElement.injector.get (AlertsService) as any;
    });

    describe ('Receive alert', () => {
      beforeEach (async (() => {
        alertHandler.addAlert ('Alert');
      }));

      it ('should have shown an alert', () => {
        expect (component['alerts'].length).toBeGreaterThan (alertsLength);
      });
    });

    describe ('error', () => {
      beforeEach (async (() => {
        alertHandler.testAlertError = 'Error';
      }));

      it ('should have shown an error message', () => {
        expect (component['alerts'].length).toBeGreaterThan (alertsLength);
      });
    });
  });

  describe ('closeAlert ()', () => {
    let alertsLength: number;
    let message1: string;
    let message2: string;
    let message3: string;

    beforeEach (() => {
      message1 = 'message 1';
      message2 = 'message 2';
      message3 = 'message 3';

      component['alerts'].push (message1);
      component['alerts'].push (message2);
      component['alerts'].push (message3);
      alertsLength = component['alerts'].length;
    });

    describe ('Remove first alert', () => {
      beforeEach (() => {
        component['closeAlert'] (0);
      });

      it ('should have removed an alert', () => {
        expect (component['alerts'].length).toBeLessThan (alertsLength);
      });

      it ('should have removed the first alert', () => {
        expect (component['alerts'][0]).toEqual (message2);
      });
    });

    describe ('Remove second alert', () => {
      beforeEach (() => {
        component['closeAlert'] (1);
      });

      it ('should have removed an alert', () => {
        expect (component['alerts'].length).toBeLessThan (alertsLength);
      });

      it ('should have removed the second alert', () => {
        expect (component['alerts'][0]).toEqual (message1);
        expect (component['alerts'][1]).toEqual (message3);
      });
    });
  });
});
