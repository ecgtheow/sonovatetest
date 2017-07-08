import { Injectable } from '@angular/core';

import { SonovatetestClient } from '../../../../app/api/model/models';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable ()
export class MockClientsService {
  private clientsSubject = new ReplaySubject<SonovatetestClient[]> (1);
  private clientSubject = new ReplaySubject<SonovatetestClient> (1);
  private clientCreateSubject = new ReplaySubject<SonovatetestClient> (1);
  private clientUpdateSubject = new ReplaySubject<SonovatetestClient> (1);
  private clientDeleteSubject = new ReplaySubject<any> (1);

  set testClients (clients: SonovatetestClient[]) {
    this.clientsSubject.next (clients);
  }

  set testClientsError (error: string) {
    this.clientsSubject.error (error);
  }

  public sonovatetestStoreReadClients(extraHttpRequestParams?: any): Observable<SonovatetestClient[]> {
    return this.clientsSubject.asObservable ();
  }

  set testClient (client: SonovatetestClient) {
    this.clientSubject.next (client);
  }

  set testClientError (error: string) {
    this.clientSubject.error (error);
  }

  public sonovatetestStoreReadClient (id: number, extraHttpRequestParams?: any): Observable<SonovatetestClient> {
    return this.clientSubject.asObservable ();
  }

  set testCreateClient (client: SonovatetestClient) {
    this.clientCreateSubject.next (client);
  }

  set testCreateClientError (error: string) {
    this.clientCreateSubject.error (error);
  }

  public sonovatetestStoreCreateClient (client: SonovatetestClient, extraHttpRequestParams?: any): Observable<SonovatetestClient> {
    return this.clientCreateSubject.asObservable ();
  }

  set testUpdateClient (client: SonovatetestClient) {
    this.clientUpdateSubject.next (client);
  }

  set testUpdateClientError (error: string) {
    this.clientUpdateSubject.error (error);
  }

  public sonovatetestStoreUpdateClient (id: number, client: SonovatetestClient, extraHttpRequestParams?: any): Observable<SonovatetestClient> {
    return this.clientUpdateSubject.asObservable ();
  }

  set testDeleteClient (client: any) {
    this.clientDeleteSubject.next (client);
  }

  set testDeleteClientError (error: string) {
    this.clientDeleteSubject.error (error);
  }

  public sonovatetestStoreDeleteClient (id: number, extraHttpRequestParams?: any): Observable<any> {
    return this.clientDeleteSubject.asObservable ();
  }
}
