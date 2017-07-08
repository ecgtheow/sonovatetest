import { Injectable } from '@angular/core';

@Injectable ()
export class MockNgbModal {
  private openresult = false;
  private openerror = false;

  set testOpenResult (result: boolean) {
    this.openresult = result;
  }

  set testOpenError (error: boolean) {
    this.openerror = error;
  }

  open (content: any, options?: any) {
    return {
      result: this.openerror ? Promise.reject (this.openresult) : Promise.resolve (this.openresult)
    };
  }
}
