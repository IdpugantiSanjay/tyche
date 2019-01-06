import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormControlDirective, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { User } from '../models/user.model';
import { ErrorHandlerService } from '../services/error-handler.service';

import * as R from 'ramda';

const { pipe, all, values } = R;

@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrls: ['./regsiter.component.css']
})
export class RegsiterComponent implements OnInit {
  form: FormGroup;
  formHelper: FormGroupHelper;

  constructor(private authService: AuthService, notificationService: ErrorHandlerService) {}

  ngOnInit() {
    this.form = this.buildForm;
    this.formHelper = new FormGroupHelper(this.form);
  }

  get buildForm() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onCreateButtonClick() {
    if (isValidUser(this.user)) {
      this.authService.registerUser(this.user).subscribe(response => console.log(response));
    }

    function isValidUser(user: User) {
      const isTruthy: (x: any) => Boolean = (x: any) => !!x === true;

      return pipe(
        values,
        isTruthy
      )(user);
    }
  }

  get user(): User {
    return {
      username: this.formHelper.getValue('username'),
      password: this.formHelper.getValue('password'),
      email: this.formHelper.getValue('email')
    };
  }
}
