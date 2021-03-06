import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IRecord, Records } from '../models/record';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { localhostUrl, user } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private get endpoint() {
    return `${localhostUrl}${user.name}/records`;
  }

  recordsChanged: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  changed$ = this.recordsChanged.asObservable();

  constructor(private httpService: HttpService) {}

  recordsModified(changed: any) {
    this.recordsChanged.next(changed);
  }

  public createRecord(record: IRecord): Observable<IRecord> {
    return this.httpService
      .postRequest<IRecord, IRecord>(this.endpoint, record)
      .pipe(tap(() => this.recordsModified(true)));
  }

  public searchRecords(searchParams?) {
    return this.httpService.getRequest<Records>(this.endpoint, new HttpParams({ fromObject: searchParams }));
  }

  public deleteRecord(record: IRecord) {
    return this.httpService
      .deleteRequest(`${this.endpoint}/${record._id}`)
      .pipe(tap(() => this.recordsModified(true)));
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

  public importRecords({ importData }) {
    return this.httpService.postRequest(`${this.endpoint}/import`, { importData });
  }

  public statistics() {
    return this.httpService.getRequest(`${this.endpoint}/statistics`);
  }
}
