import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedsBlurDirective } from '../needs-blur.directive';
import { AreYouSureDialogComponent } from '../are-you-sure-dialog/are-you-sure-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NeedsBlurDirective,
    AreYouSureDialogComponent
  ],
  exports: [
    NeedsBlurDirective,
    AreYouSureDialogComponent
  ],
  entryComponents: [
    AreYouSureDialogComponent
  ],
})
export class SharedModule { }
