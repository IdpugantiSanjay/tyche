import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { authUrl } from 'src/environments/environment';
import { user } from 'src/environments/environment.prod';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(): boolean {
    if (!!!user.name) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public registerUser(user: User) {
    return this.httpService.postRequest(authUrl(), user);
  }

  public loginUser(user: Partial<User>) {
    return this.httpService.postRequest(`${authUrl()}/search`, user);
  }
}
