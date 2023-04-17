import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramsListService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  getProgramsList(ids?: string[]): Observable<any[]> {
    return this.httpClient
      .get(
        `programs?fields=id,name${
          ids && ids?.length > 0 ? '&filter=id:in:[' + ids?.join(',') + ']' : ''
        }`
      )
      .pipe(
        map((response) => {
          return response?.programs || [];
        }),
        catchError((error) => of(error))
      );
  }

  getProgramDetailsById(id: string, fields?: string): Observable<any> {
    return this.httpClient.get(`programs/${id}.json?fields=${fields}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => of(error))
    );
  }

  getProgramRules(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  getProgramRuleActions(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  getProgramStageDetails(programStageId: string): Observable<any> {
    return this.httpClient
      .get(
        `programStages/${programStageId}.json?fields=id,name,dataEntryForm[*],programStageDataElements[id,sortOrder,mandatory,dataElement[id,name,aggregationType,displayName,shortName,valueType,optionSetValue,attributeValues,optionSet[id,name,options[id,name,code]]]],programStageSections[id,name,sortOrder,dataElements[id,name,valueType,attributeValues,optionSetValue,optionSet[id,name,options[id,name,code]]]]`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }
}
