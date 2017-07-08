import { Injectable } from '@angular/core';

import { SonovatetestCandidate } from '../../../../app/api/model/models';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable ()
export class MockCandidatesService {
  private candidatesSubject = new ReplaySubject<SonovatetestCandidate[]> (1);
  private candidateSubject = new ReplaySubject<SonovatetestCandidate> (1);
  private candidateCreateSubject = new ReplaySubject<SonovatetestCandidate> (1);
  private candidateUpdateSubject = new ReplaySubject<SonovatetestCandidate> (1);
  private candidateDeleteSubject = new ReplaySubject<any> (1);

  set testCandidates (candidates: SonovatetestCandidate[]) {
    this.candidatesSubject.next (candidates);
  }

  set testCandidatesError (error: string) {
    this.candidatesSubject.error (error);
  }

  public sonovatetestStoreReadCandidates(extraHttpRequestParams?: any): Observable<SonovatetestCandidate[]> {
    return this.candidatesSubject.asObservable ();
  }

  set testCandidate (candidate: SonovatetestCandidate) {
    this.candidateSubject.next (candidate);
  }

  set testCandidateError (error: string) {
    this.candidateSubject.error (error);
  }

  public sonovatetestStoreReadCandidate (id: number, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
    return this.candidateSubject.asObservable ();
  }

  set testCreateCandidate (candidate: SonovatetestCandidate) {
    this.candidateCreateSubject.next (candidate);
  }

  set testCreateCandidateError (error: string) {
    this.candidateCreateSubject.error (error);
  }

  public sonovatetestStoreCreateCandidate (candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
    return this.candidateCreateSubject.asObservable ();
  }

  set testUpdateCandidate (candidate: SonovatetestCandidate) {
    this.candidateUpdateSubject.next (candidate);
  }

  set testUpdateCandidateError (error: string) {
    this.candidateUpdateSubject.error (error);
  }

  public sonovatetestStoreUpdateCandidate (id: number, candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
    return this.candidateUpdateSubject.asObservable ();
  }

  set testDeleteCandidate (candidate: any) {
    this.candidateDeleteSubject.next (candidate);
  }

  set testDeleteCandidateError (error: string) {
    this.candidateDeleteSubject.error (error);
  }

  public sonovatetestStoreDeleteCandidate (id: number, extraHttpRequestParams?: any): Observable<any> {
    return this.candidateDeleteSubject.asObservable ();
  }
}
