import { Injectable } from '@angular/core';
import { localhostUrl, user } from 'src/environments/environment.prod';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
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
