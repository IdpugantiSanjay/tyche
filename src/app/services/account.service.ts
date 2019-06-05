import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { localhostUrl } from 'src/environments/environment';
import { user } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountEndPoint = `${localhostUrl}${user.name}/accounts`;

  constructor(private httpService: HttpService) {}

  public saveAccount(account: IAccount) {
    return this.httpService.postRequest(`${this.accountEndPoint}`, account);
  }

  public getUserAccounts() {
    return this.httpService.getRequest<Array<IAccount>>(`${this.accountEndPoint}`);
  }

  public deleteUserAccount(account: IAccount) {
    return this.httpService.deleteRequest(`${this.accountEndPoint}/${account._id}`);
  }
}
