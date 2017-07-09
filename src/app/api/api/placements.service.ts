/**
 * Sonovate Technical Project Service
 * Sonovate Technical Project Service swagger definitions
 *
 * OpenAPI spec version: 0.0.0
 * Contact: dick@ecgtheow.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { Http, Headers, URLSearchParams }                    from '@angular/http';
import { RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Response, ResponseContentType }                     from '@angular/http';

import { Observable }                                        from 'rxjs/Observable';
import '../rxjs-operators';

import { SonovatetestCandidate } from '../model/sonovatetestCandidate';
import { SonovatetestClient } from '../model/sonovatetestClient';
import { SonovatetestPlacement } from '../model/sonovatetestPlacement';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PlacementsService {

    protected basePath = 'https://localhost';
    public defaultHeaders: Headers = new Headers();
    public configuration: Configuration = new Configuration();

    constructor(protected http: Http, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
			this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * 
     * Extends object by coping non-existing properties.
     * @param objA object to be extended
     * @param objB source object
     */
    private extendObj<T1,T2>(objA: T1, objB: T2) {
        for(let key in objB){
            if(objB.hasOwnProperty(key)){
                (objA as any)[key] = (objB as any)[key];
            }
        }
        return <T1&T2>objA;
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }

    /**
     * Create placement
     * Create a placement in the store
     * @param placement The placement to be created
     */
    public sonovatetestStoreCreatePlacement(placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
        return this.sonovatetestStoreCreatePlacementWithHttpInfo(placement, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Delete placement
     * Delete a placement in the store
     * @param id 
     */
    public sonovatetestStoreDeletePlacement(id: number, extraHttpRequestParams?: any): Observable<{}> {
        return this.sonovatetestStoreDeletePlacementWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get placement
     * Retrieve a placement from the store using its id
     * @param id 
     */
    public sonovatetestStoreReadPlacement(id: number, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
        return this.sonovatetestStoreReadPlacementWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get candidate for a placement
     * Retrieve the candidate associated with a placement
     * @param id 
     */
    public sonovatetestStoreReadPlacementCandidate(id: number, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
        return this.sonovatetestStoreReadPlacementCandidateWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get client for a placement
     * Retrieve the client associated with a placement
     * @param id 
     */
    public sonovatetestStoreReadPlacementClient(id: number, extraHttpRequestParams?: any): Observable<SonovatetestClient> {
        return this.sonovatetestStoreReadPlacementClientWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get placements
     * Retrieve all placements from the store
     */
    public sonovatetestStoreReadPlacements(extraHttpRequestParams?: any): Observable<Array<SonovatetestPlacement>> {
        return this.sonovatetestStoreReadPlacementsWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Update placement
     * Update a placement in the store
     * @param id 
     * @param placement The placement to be updated.  The id must match the id in the path parameter
     */
    public sonovatetestStoreUpdatePlacement(id: number, placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<SonovatetestPlacement> {
        return this.sonovatetestStoreUpdatePlacementWithHttpInfo(id, placement, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }


    /**
     * Create placement
     * Create a placement in the store
     * @param placement The placement to be created
     */
    public sonovatetestStoreCreatePlacementWithHttpInfo(placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'placement' is not null or undefined
        if (placement === null || placement === undefined) {
            throw new Error('Required parameter placement was null or undefined when calling sonovatetestStoreCreatePlacement.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: placement == null ? '' : JSON.stringify(placement), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Delete placement
     * Delete a placement in the store
     * @param id 
     */
    public sonovatetestStoreDeletePlacementWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreDeletePlacement.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Delete,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get placement
     * Retrieve a placement from the store using its id
     * @param id 
     */
    public sonovatetestStoreReadPlacementWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreReadPlacement.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get candidate for a placement
     * Retrieve the candidate associated with a placement
     * @param id 
     */
    public sonovatetestStoreReadPlacementCandidateWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements/${id}/candidate'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreReadPlacementCandidate.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get client for a placement
     * Retrieve the client associated with a placement
     * @param id 
     */
    public sonovatetestStoreReadPlacementClientWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements/${id}/client'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreReadPlacementClient.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Get placements
     * Retrieve all placements from the store
     */
    public sonovatetestStoreReadPlacementsWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845


        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Get,
            headers: headers,
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    /**
     * Update placement
     * Update a placement in the store
     * @param id 
     * @param placement The placement to be updated.  The id must match the id in the path parameter
     */
    public sonovatetestStoreUpdatePlacementWithHttpInfo(id: number, placement: SonovatetestPlacement, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/placements/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreUpdatePlacement.');
        }
        // verify required parameter 'placement' is not null or undefined
        if (placement === null || placement === undefined) {
            throw new Error('Required parameter placement was null or undefined when calling sonovatetestStoreUpdatePlacement.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: placement == null ? '' : JSON.stringify(placement), // https://github.com/angular/angular/issues/10612
            search: queryParameters,
            withCredentials:this.configuration.withCredentials
        });
        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = (<any>Object).assign(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

}
