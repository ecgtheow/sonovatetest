import { TestBed, async, inject } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CanDeactivateGuard } from './can-deactivate.guard';

@Component ({
  template: ''
})
class TestWithCanDeactivateComponent {
  canDeactivate (): Observable<boolean> {
    return Observable.of<boolean> (true);
  }
}

@Component ({
  template: ''
})
class TestWithoutCanDeactivateComponent {
}

describe('CanDeactivateGuard', () => {
  let guard: CanDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestWithCanDeactivateComponent,
        TestWithoutCanDeactivateComponent
      ],
      providers: [CanDeactivateGuard]
    })
      .compileComponents ();
  });

  beforeEach (inject ([CanDeactivateGuard], (g: CanDeactivateGuard) => {
    guard = g;
  }));

  it('should ...', () => {
    expect(guard).toBeTruthy();
  });

  describe ('Component does not have canDeactive ()', () => {
    let component: TestWithoutCanDeactivateComponent;

    beforeEach (() => {
      component = TestBed.createComponent (TestWithoutCanDeactivateComponent).componentInstance;
    });

    it ('should return truthy', () => {
      expect (guard.canDeactivate (component as any)).toBeTruthy ();
    });
  });

  describe ('Component has canDeactivate ()', () => {
    let component: TestWithCanDeactivateComponent;

    beforeEach (() => {
      component = TestBed.createComponent (TestWithCanDeactivateComponent).componentInstance;
    });

    it ('should return an Observable', () => {
      expect (guard.canDeactivate (component)).toEqual (jasmine.any (Observable));
    });
  });
});
