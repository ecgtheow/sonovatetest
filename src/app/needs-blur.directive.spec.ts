import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, ElementRef } from '@angular/core';

import { NeedsBlurDirective } from './needs-blur.directive';

class StubElementRef {
  public get nativeElement () {
    return {
      blur: () => {}
    };
  }
}

@Component ({
  template: '<div appNeedsBlur></div>'
})
class TestHostNeedsBlurComponent {
  @ViewChild (NeedsBlurDirective) nb: NeedsBlurDirective;

  public blur (): void {
    if (this.nb) {
      this.nb.blur ();
    }
  }
}

describe ('NeedsBlurDirective', () => {
  let component: TestHostNeedsBlurComponent;
  let fixture: ComponentFixture<TestHostNeedsBlurComponent>;

  beforeEach (async (() => {
    TestBed.configureTestingModule ({
      declarations: [
        NeedsBlurDirective,
        TestHostNeedsBlurComponent
      ]
    })
      .compileComponents ();
  }));

  beforeEach (() => {
    fixture = TestBed.createComponent (TestHostNeedsBlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges ();
  });

  it ('should create an instance', () => {
    expect (component).toBeTruthy ();
  });

  describe ('blur ()', () => {
    let el: ElementRef;

    beforeEach (() => {
      el = component.nb['el'];

      spyOn (el.nativeElement, 'blur');

      component.blur ();
    });

    it ('should call el.nativeElement.blur ()', () => {
      expect (el.nativeElement.blur).toHaveBeenCalled ();
    });
  });
});
