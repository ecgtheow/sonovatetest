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

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CandidatesService {

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
     * Create candidate
     * Create a candidate in the store
     * @param candidate The candidate to be created
     */
    public sonovatetestStoreCreateCandidate(candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
        return this.sonovatetestStoreCreateCandidateWithHttpInfo(candidate, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Delete candidate
     * Delete a candidate in the store
     * @param id 
     */
    public sonovatetestStoreDeleteCandidate(id: number, extraHttpRequestParams?: any): Observable<{}> {
        return this.sonovatetestStoreDeleteCandidateWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get candidate
     * Retrieve a candidate from the store using its id
     * @param id 
     */
    public sonovatetestStoreReadCandidate(id: number, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
        return this.sonovatetestStoreReadCandidateWithHttpInfo(id, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Get candidates
     * Retrieve all candidates from the store
     */
    public sonovatetestStoreReadCandidates(extraHttpRequestParams?: any): Observable<Array<SonovatetestCandidate>> {
        return this.sonovatetestStoreReadCandidatesWithHttpInfo(extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }

    /**
     * Update candidate
     * Update a candidate in the store
     * @param id 
     * @param candidate The candidate to be updated.  The id must match the id in the path parameter
     */
    public sonovatetestStoreUpdateCandidate(id: number, candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<SonovatetestCandidate> {
        return this.sonovatetestStoreUpdateCandidateWithHttpInfo(id, candidate, extraHttpRequestParams)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json() || {};
                }
            });
    }


    /**
     * Create candidate
     * Create a candidate in the store
     * @param candidate The candidate to be created
     */
    public sonovatetestStoreCreateCandidateWithHttpInfo(candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/candidates';

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'candidate' is not null or undefined
        if (candidate === null || candidate === undefined) {
            throw new Error('Required parameter candidate was null or undefined when calling sonovatetestStoreCreateCandidate.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: candidate == null ? '' : JSON.stringify(candidate), // https://github.com/angular/angular/issues/10612
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
     * Delete candidate
     * Delete a candidate in the store
     * @param id 
     */
    public sonovatetestStoreDeleteCandidateWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/candidates/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreDeleteCandidate.');
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
     * Get candidate
     * Retrieve a candidate from the store using its id
     * @param id 
     */
    public sonovatetestStoreReadCandidateWithHttpInfo(id: number, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/candidates/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreReadCandidate.');
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
     * Get candidates
     * Retrieve all candidates from the store
     */
    public sonovatetestStoreReadCandidatesWithHttpInfo(extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/candidates';

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
     * Update candidate
     * Update a candidate in the store
     * @param id 
     * @param candidate The candidate to be updated.  The id must match the id in the path parameter
     */
    public sonovatetestStoreUpdateCandidateWithHttpInfo(id: number, candidate: SonovatetestCandidate, extraHttpRequestParams?: any): Observable<Response> {
        const path = this.basePath + '/api/store/candidates/${id}'
                    .replace('${' + 'id' + '}', String(id));

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling sonovatetestStoreUpdateCandidate.');
        }
        // verify required parameter 'candidate' is not null or undefined
        if (candidate === null || candidate === undefined) {
            throw new Error('Required parameter candidate was null or undefined when calling sonovatetestStoreUpdateCandidate.');
        }

        // to determine the Accept header
        let produces: string[] = [
            'application/json'
        ];

            
        headers.set('Content-Type', 'application/json');

        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Put,
            headers: headers,
            body: candidate == null ? '' : JSON.stringify(candidate), // https://github.com/angular/angular/issues/10612
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
