import { Injectable } from '@angular/core';
import { localhostUrl, user } from 'src/environments/environment.prod';
import { HttpService } from './http.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private emitAccountSettingChanged = new Subject<boolean>();

  accountSettingChanged$ = this.emitAccountSettingChanged.asObservable();

  emitAccountSettingChangedEvent(enabled: boolean) {
    this.emitAccountSettingChanged.next(enabled);
  }

  private get settingsUrl() {
    return `${localhostUrl}${user.name}/settings`;
  }

  constructor(private httpService: HttpService) {}

  public saveSettings(settings) {
    return this.httpService.postRequest(`${this.settingsUrl}`, settings);
  }

  public userSettings() {
    return this.httpService.getRequest(`${this.settingsUrl}`);
  }
}
