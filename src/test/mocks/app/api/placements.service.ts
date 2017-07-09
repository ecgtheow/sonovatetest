import { Injectable } from '@angular/core';

import { SonovatetestPlacement, SonovatetestCandidate, SonovatetestClient } from '../../../../app/api/model/models';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable ()
export class MockPlacementsService {
  private placementsSubject = new ReplaySubject<SonovatetestPlacement[]> (1);
  private placementSubject = new ReplaySubject<SonovatetestPlacement> (1);
  private placementCreateSubject = new ReplaySubject<SonovatetestPlacement> (1);
  private placementUpdateSubject = new ReplaySubject<SonovatetestPlacement> (1);
  private placementDeleteSubject = new ReplaySubject<any> (1);
  private placementCandidateSubject = new ReplaySubject<SonovatetestCandidate> (1);
  private placementClientSubject = new ReplaySubject<SonovatetestClient> (1);

  set testPlacements (placements: SonovatetestPlacement[]) {
    this.placementsSubject.next (placements);
  }

  set testPlacementsError (error: string) {
    this.placementsSubject.error (error);
  }

  public sonovatetestStoreReadPlacements(extraHttpRequestParams?: any): Observable<SonovatetestPlacement[]> {
    return this.placementsSubject.asObservable ();
  }

  set testPlacement (placement: SonovatetestPlacement) {
    this.placementSubject.next (placement);
  }

  set testPlacementError (error: string) {
    this.placementSubject.error (error);
  }

  public sonovatetestStoreReadPlacement (id: number, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
    return this.placementSubject.asObservable ();
  }

  set testCreatePlacement (placement: SonovatetestPlacement) {
    this.placementCreateSubject.next (placement);
  }

  set testCreatePlacementError (error: string) {
    this.placementCreateSubject.error (error);
  }

  public sonovatetestStoreCreatePlacement (placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
    return this.placementCreateSubject.asObservable ();
  }

  set testUpdatePlacement (placement: SonovatetestPlacement) {
    this.placementUpdateSubject.next (placement);
  }

  set testUpdatePlacementError (error: string) {
    this.placementUpdateSubject.error (error);
  }

  public sonovatetestStoreUpdatePlacement (id: number, placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
    return this.placementUpdateSubject.asObservable ();
  }

  set testDeletePlacement (placement: any) {
    this.placementDeleteSubject.next (placement);
  }

  set testDeletePlacementError (error: string) {
    this.placementDeleteSubject.error (error);
  }

  public sonovatetestStoreDeletePlacement (id: number, extraHttpRequestParams?: any): Observable<any> {
    return this.placementDeleteSubject.asObservable ();
  }

  set testPlacementCandidate (candidate: SonovatetestCandidate) {
    this.placementCandidateSubject.next (candidate);
  }

  set testPlacementCandidateError (error: string) {
    this.placementCandidateSubject.error (error);
  }

  public sonovatetestStoreReadPlacementCandidate (id: number, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
    return this.placementCandidateSubject.asObservable ();
  }

  set testPlacementClient (client: SonovatetestClient) {
    this.placementClientSubject.next (client);
  }

  set testPlacementClientError (error: string) {
    this.placementClientSubject.error (error);
  }

  public sonovatetestStoreReadPlacementClient (id: number, extraHttpRequestParams?: any): Observable<SonovatetestClient> {
    return this.placementClientSubject.asObservable ();
  }
}
