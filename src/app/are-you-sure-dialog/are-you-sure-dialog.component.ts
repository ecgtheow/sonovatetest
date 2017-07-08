import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component ({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.scss']
})
export class AreYouSureDialogComponent {
  constructor (private modal: NgbActiveModal) {
  }

  private close (sure: boolean) {
    this.modal.close (sure);
  }

  private dismiss (reason: string) {
    this.modal.dismiss (reason);
  }
}
