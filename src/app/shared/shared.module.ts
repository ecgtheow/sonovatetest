import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NeedsBlurDirective } from '../needs-blur.directive';
import { AreYouSureDiscardDialogComponent } from '../are-you-sure-discard-dialog/are-you-sure-discard-dialog.component';
import { AreYouSureDeleteDialogComponent } from '../are-you-sure-delete-dialog/are-you-sure-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NeedsBlurDirective,
    AreYouSureDiscardDialogComponent,
    AreYouSureDeleteDialogComponent
  ],
  exports: [
    NeedsBlurDirective,
    AreYouSureDiscardDialogComponent,
    AreYouSureDeleteDialogComponent
  ],
  entryComponents: [
    AreYouSureDiscardDialogComponent,
    AreYouSureDeleteDialogComponent
  ],
})
export class SharedModule { }
