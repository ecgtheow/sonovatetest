import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MockNgbActiveModal } from '../../test/mocks/third-party/ng-bootstrap/active-modal';
import { AreYouSureDeleteDialogComponent } from './are-you-sure-delete-dialog.component';

describe ('AreYouSureDeleteDialogComponent', () => {
  let component: AreYouSureDeleteDialogComponent;
  let fixture: ComponentFixture<AreYouSureDeleteDialogComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      imports: [
        NgbModule.forRoot ()
      ],
      declarations: [ AreYouSureDeleteDialogComponent ]
    })
      .overrideComponent (AreYouSureDeleteDialogComponent, {
        set: {
          providers: [{
            provide: NgbActiveModal,
            useClass: MockNgbActiveModal
          }]
        }
      })
    .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (AreYouSureDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it('should be created', () => {
    expect(component).toBeTruthy ();
  });

  describe ('close ()', () => {
    let modal: MockNgbActiveModal;

    beforeEach (() => {
      modal = fixture.debugElement.injector.get (NgbActiveModal);

      spyOn (modal, 'close');

      component['close'] (true);
    });

    it ('should have called modal.close ()', () => {
      expect (modal.close).toHaveBeenCalledWith (true);
    });
  });

  describe ('dismiss ()', () => {
    let modal: MockNgbActiveModal;
    let reason: string;

    beforeEach (() => {
      modal = fixture.debugElement.injector.get (NgbActiveModal);
      reason = 'dismiss reason';

      spyOn (modal, 'dismiss');

      component['dismiss'] (reason);
    });

    it ('should have called modal.dismiss ()', () => {
      expect (modal.dismiss).toHaveBeenCalledWith (reason);
    });
  });
});
