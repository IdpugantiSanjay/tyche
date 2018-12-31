import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IRecord, Records } from '../models/record';
import { recordUrl } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private endpoint = recordUrl;

  private recordsChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  changed$ = this.recordsChanged.asObservable();

  constructor(private httpService: HttpService) {}

  recordsModified(changed: boolean) {
    this.recordsChanged.next(changed);
  }

  public createRecord(record: IRecord): Observable<IRecord> {
    return this.httpService
      .postRequest<IRecord, IRecord>(this.endpoint, record)
      .pipe(tap(() => this.recordsModified(true)));
  }

  public searchRecords() {
    return this.httpService.getRequest<Records>(this.endpoint);
  }

  public deleteRecord(record: IRecord) {
    return this.httpService.deleteRequest(`${this.endpoint}/${record._id}`).pipe(tap(() => this.recordsModified(true)));
  }

  public getTotalAmount(startTime: Date, endTime: Date) {
    const httpParams = new HttpParams({
      fromObject: { startTime: startTime.toISOString(), endTime: endTime.toISOString() }
    });

    return this.httpService.getRequest(`${this.endpoint}/total`, httpParams);
  }

  public exportRecords() {
    return this.httpService.getRequest(
      `${this.endpoint}/export`,
      undefined,
      new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
    );
  }

  public statistics() {
    return this.httpService.getRequest(`${this.endpoint}/statistics`);
  }
}
