import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  saveTrackedEntityInstance(data: any): Observable<any> {
    return this.httpClient.post('trackedEntityInstances', data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getTrackedEntityInstances(dimensions: any): Observable<any> {
    return this.httpClient
      .get(
        `trackedEntityInstances/query.json?ou=${dimensions?.ou}&ouMode=SELECTED&&order=created:desc&program=${dimensions?.program}&pageSize=50&page=1&totalPages=false`
      )
      .pipe(
        map((response) => {
          const formattedHeaders = (
            response?.headers?.filter(
              (header) =>
                header?.name != 'instance' &&
                header?.name != 'ou' &&
                header?.name != 'te'
            ) || []
          )?.map((header) => {
            return {
              ...header,
              column:
                header?.name === 'created' ? 'Reporting date' : header?.column,
            };
          });
          return {
            ...response,
            headers: formattedHeaders,
            data: response?.rows?.map((row) => {
              let data = {};
              response?.headers?.forEach((header, index) => {
                data[header?.name] = row[index];
              });
              console.log('DADD', data);
              return data;
            }),
          };
        })
      );
  }
}
