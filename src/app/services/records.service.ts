import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IRecord, Records } from '../models/record';
import { recordUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private endpoint = recordUrl;

  constructor(private httpService: HttpService) {}

  public createRecord(record: IRecord): Observable<IRecord> {
    return this.httpService.postRequest<IRecord, IRecord>(this.endpoint, record);
  }

  public searchRecords() {
    return this.httpService.getRequest<Records>(this.endpoint);
  }

  public deleteRecord(record: IRecord) {
    return this.httpService.deleteRequest(`${this.endpoint}/${record._id}`);
  }

  public getTotalAmount(startTime: Date, endTime: Date) {
    const httpParams = new HttpParams({
      fromObject: { startTime: startTime.toISOString(), endTime: endTime.toISOString() }
    });

    return this.httpService.getRequest(`${this.endpoint}/total`, httpParams);
  }
}
