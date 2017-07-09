import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component ({
  selector: 'app-are-you-sure-discard-dialog',
  templateUrl: './are-you-sure-discard-dialog.component.html',
  styleUrls: ['./are-you-sure-discard-dialog.component.scss']
})
export class AreYouSureDiscardDialogComponent {
  constructor (private modal: NgbActiveModal) {
  }

  public close (sure: boolean) {
    this.modal.close (sure);
  }

  public dismiss (reason: string) {
    this.modal.dismiss (reason);
  }
}
