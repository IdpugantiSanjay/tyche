import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  /**
   * @param url The url the http reuquest to call
   * @param body The post data to send to the server
   */
  postRequest<T, R>(url: string, body: T): Observable<R> {
    return this.http.post<R>(url, body);
  }

  /**
   * Get request to a server
   * @param url url to call
   */
  getRequest<R>(url: string, params?: HttpParams): Observable<R> {
    return this.http.get<R>(url, { params });
  }

  /**
   * Put request to a server
   * @param url Url to call
   * @param body The object which contains the updated properties
   */
  putRequest<T, R>(url: string, body: T): Observable<R> {
    return this.http.put<R>(url, body);
  }

  /**
   * Delete request to a server
   * @param url url to call
   */
  deleteRequest<R>(url: string): Observable<R> {
    return this.http.delete<R>(url);
  }
}
