import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { authUrl } from 'src/environments/environment';
import { user } from 'src/environments/environment.prod';
import { Router, CanActivate } from '@angular/router';
import { tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public token: string;

  constructor(private httpService: HttpService, private router: Router) {}

  canActivate(): boolean {
    if (!user.name) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  public registerUser(user: Partial<User>) {
    return this.httpService.postRequest(authUrl(), user);
  }

  public loginUser(user: Partial<User>) {
    return this.httpService.postRequest(`${authUrl()}/search`, user).pipe(
      filter<Partial<User>>(response => !!response),
      tap(response => {
        user.settings = response.settings;
        this.token = response.token;
      })
    );
  }

  public redirectToLogin() {
    this.token = null;
    this.router.navigate(['login']);
  }
}
