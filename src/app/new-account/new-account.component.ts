import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupHelper } from '../helpers/form-group-helper';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  form: FormGroup;
  formGroupHelper: FormGroupHelper;

  constructor() { }

  ngOnInit() {
    this.form = this.formGroup;

    this.formGroupHelper = new FormGroupHelper(this.form);
  }


  get formGroup() {
    const form = new FormGroup({
      accountBalance: new FormControl('', Validators.compose([Validators.required])),
      accountName: new FormControl('', Validators.maxLength(120)),
    });

    return form;
  }

}
