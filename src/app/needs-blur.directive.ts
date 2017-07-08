import { Directive, ElementRef } from '@angular/core';

@Directive ({
  selector: '[appNeedsBlur]'
})
export class NeedsBlurDirective {
  constructor (private el: ElementRef) {
  }

  public blur (): void {
    this.el.nativeElement.blur ();
  }
}
