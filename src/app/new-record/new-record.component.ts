import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription, Observable } from 'rxjs';
import { user, localhostUrl } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RecordsService } from '../services/records.service';
import { IRecord } from '../models/record';
import { Router } from '@angular/router';
import * as _ from 'lodash';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  recordTypes = [{ value: 1, viewValue: 'Income' }, { value: 2, viewValue: 'Expenditure' }];

  form: FormGroup;
  formGroupHelper: FormGroupHelper;

  hours = [];
  mins = [];
  periods = ['AM', 'PM'];

  categories$: Observable<any>;

  constructor(private httpService: HttpService, private recordsService: RecordsService, private router: Router) {
    this.form = new FormGroup({
      type: new FormControl(2, Validators.compose([Validators.required])),
      category: new FormControl('Food and Drinks', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl('', Validators.maxLength(120)),
      date: new FormControl(new Date()),
      hour: new FormControl(new Date().getHours() % 12),
      mins: new FormControl(new Date().getMinutes() + ''),
      period: new FormControl('PM')
    });
    this.formGroupHelper = new FormGroupHelper(this.form);
    this.categories$ = this.httpService.getRequest(`${localhostUrl}${user.name}/categories`);
  }

  ngOnInit() {
    [this.hours, this.mins] = [this.generateHours(), this.generateMins()];
    console.log(this.hours, this.mins);
  }

  onSubmitButtonClick() {
    this.recordsService.createRecord(this.record).subscribe(() => this.router.navigateByUrl('/home/list'));
  }

  get record(): IRecord {
    let record = {} as IRecord;
    record.value = this.formGroupHelper.getValue('amount');
    record.type = this.formGroupHelper.getValue('type');
    record.description = this.formGroupHelper.getValue('reason');
    record.category = this.formGroupHelper.getValue('category');
    record.createdDate = this.time;
    return record;
  }

  get time(): Date {
    const date = this.formGroupHelper.getValue('date') as Date;
    const hours = this.formGroupHelper.getValue<number>('hour') || 0;
    const mins = this.formGroupHelper.getValue<number>('mins') || 0;

    date.setHours(hours, mins);
    return date;
  }

  /**
   * Generate hours in a day
   */
  generateHours() {
    return _.range(1, 12 + 1);
  }

  /**
   * Generate mins in an hour
   */
  generateMins() {
    return _.map(_.range(0, 60 + 1), number => number.toString().padStart(2, '0'));
  }
}

export class FormGroupHelper {
  private formGroup: FormGroup;

  constructor(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  getValue<T>(propertyName: string): T {
    if (!this.formGroup.contains(propertyName)) {
      throw new Error('No form control with name ' + propertyName);
    }

    return this.formGroup.controls[propertyName].value;
  }
}
