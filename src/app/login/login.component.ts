import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { AuthService } from '../services/auth.service';
import { filter, tap } from 'rxjs/operators';
import { user } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formGroupHelper: FormGroupHelper;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.formBuilder;
    this.formGroupHelper = new FormGroupHelper(this.form);

    this.setCachedLoginCredentials();
  }

  onLoginButtonClick() {
    this.authService
      .loginUser(this.user)
      .pipe(
        filter((response: User) => !!response.email),
        tap((response: User) => (user.name = response.username)),
        tap((response: User) => this.cacheLoginCredentials(this.user)),
        tap(() => this.router.navigateByUrl('home/list'))
      )
      .subscribe();
  }

  get formBuilder() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get user(): Partial<User> {
    return {
      username: this.formGroupHelper.getValue('username'),
      password: this.formGroupHelper.getValue('password')
    };
  }

  private getCachedLoginCredentials(): Partial<User> {
    var credentials = localStorage.getItem('login-credentials');
    if (credentials) {
      return JSON.parse(credentials) as Partial<User>;
    }
    return undefined;
  }

  private setCachedLoginCredentials() {
    var userCredentials = this.getCachedLoginCredentials();

    if (userCredentials) {
      this.formGroupHelper.setValue('username', userCredentials.username);
      this.formGroupHelper.setValue('password', userCredentials.password);
    }
  }

  private cacheLoginCredentials(user: Partial<User>) {
    localStorage.setItem('login-credentials', JSON.stringify(user));
  }
}
