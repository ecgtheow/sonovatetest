import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { SonovatetestPlacement, SonovatetestCandidate, SonovatetestClient } from '../../api/model/models';
import { AlertsService } from '../../alerts.service';

class Timesheet {
  public days: moment.Moment[] = [];

  constructor (public startdate: moment.Moment,
               public enddate: moment.Moment) {
    const current = moment.utc (this.startdate);

    while (current.isSameOrBefore (this.enddate)) {
      this.days.push (current.clone ());
      current.add (1, 'day');
    }
  }
}

@Component ({
  selector: 'app-placement-timesheets',
  templateUrl: './placement-timesheets.component.html',
  styleUrls: ['./placement-timesheets.component.scss']
})
export class PlacementTimesheetsComponent implements OnInit, OnDestroy {
  /* See https://stackoverflow.com/a/41177163 for subscribe cleanup */
  private ngUnsubscribe: Subject<void> = new Subject<void> ();
  public placement: SonovatetestPlacement;
  public candidate: SonovatetestCandidate;
  public client: SonovatetestClient;
  public sheets: Timesheet[] = [];

  constructor (private route: ActivatedRoute,
               private router: Router,
               private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.route.data
      .takeUntil (this.ngUnsubscribe)
      .subscribe ((data: {
        placement: SonovatetestPlacement,
        candidate: SonovatetestCandidate,
        client: SonovatetestClient
      }) => {
        this.placement = data.placement;
        this.candidate = data.candidate;
        this.client = data.client;

        this.generateTimesheets ();
      });
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next ();
    this.ngUnsubscribe.complete ();
  }

  generateTimesheets () {
    if (!this.placement) {
      return;
    }

    if (!this.placement.startdate) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} does not have a start date`);
      return;
    }

    if (!this.placement.enddate) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} does not have an end date`);
      return;
    }

    if (!this.candidate) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} does not have a candidate`);
      return;
    }

    if (!this.client) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} does not have a client`);
      return;
    }

    if (this.placement.startdate > this.placement.enddate) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} ends before it starts`);
      return;
    }

    if (this.placement.placementtype !== 0 &&
        this.placement.placementtype !== 1) {
      this.alertsService.addAlert (`Timesheet ${this.placement.jobtitle} has an invalid placement type`);
      return;
    }

    this.sheets.splice (0);

    let current = moment.utc (this.placement.startdate);
    const finish = moment.utc (this.placement.enddate);

    while (current.isSameOrBefore (finish)) {
      let end: moment.Moment;

      if (this.placement.placementtype === 0) {
        /* Weekly - sets end to next Sunday */
        end = current.clone ().day (7);
      } else {
        /* Monthly */
        end = current.clone ().endOf ('month').startOf ('day');
      }

      if (end.isAfter (finish)) {
        end = finish;
      }

      this.sheets.push (new Timesheet (current, end));

      current = end.clone ().add (1, 'day');
    }
  }

  done (): void {
    const placementId = this.placement ? this.placement.id : null;

    this.router.navigate (['/placements', {
      id: placementId
    }]);
  }

}
