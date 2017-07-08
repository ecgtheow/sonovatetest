import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedsBlurDirective } from '../needs-blur.directive';
import { AreYouSureDiscardDialogComponent } from '../are-you-sure-discard-dialog/are-you-sure-discard-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NeedsBlurDirective,
    AreYouSureDiscardDialogComponent
  ],
  exports: [
    NeedsBlurDirective,
    AreYouSureDiscardDialogComponent
  ],
  entryComponents: [
    AreYouSureDiscardDialogComponent
  ],
})
export class SharedModule { }
