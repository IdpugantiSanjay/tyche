import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription, Observable } from 'rxjs';
import { user, localhostUrl } from 'src/environments/environment';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RecordsService } from '../services/records.service';
import { IRecord } from '../models/record';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { ErrorHandlerService } from '../services/error-handler.service';

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

  hours: Array<number>;
  mins: Array<string>;

  weekOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  spanOptions = ['Day', 'Week', 'Month'];

  periods = ['AM', 'PM'];

  categories$: Observable<any>;

  constructor(
    private httpService: HttpService,
    private recordsService: RecordsService,
    private router: Router,
    private notificationService: ErrorHandlerService
  ) {}

  ngOnInit() {
    [this.hours, this.mins] = [this.generateHours(), this.generateMins()];

    this.form = this.formGroup;
    this.formGroupHelper = new FormGroupHelper(this.form);
    this.categories$ = this.httpService.getRequest(`${localhostUrl}${user.name}/categories`);
  }

  onSubmitButtonClick() {
    this.recordsService.createRecord(this.record).subscribe(() => this.router.navigateByUrl('/home/list'));
  }

  onClearButtonClick() {
    this.formGroupHelper.clear();
  }

  get record(): IRecord {
    const record = {} as IRecord;
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

    const period = this.formGroupHelper.getValue<string>('period');

    date.setHours(period === 'PM' ? hours + 12 : hours, mins);
    return date;
  }

  get formGroup() {
    return new FormGroup({
      type: new FormControl(2, Validators.compose([Validators.required])),
      category: new FormControl('Food and Drinks', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl('', Validators.maxLength(120)),
      date: new FormControl(new Date(), Validators.required),
      hour: new FormControl(new Date().getHours() % 12),
      mins: new FormControl(new Date().getMinutes() + ''),
      period: new FormControl('PM')
    });
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

  validateDate(dateString: string) {
    isValidDate(dateString) ? this.notificationService.handleError('Invalid date') : null;
  }
}

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
function isValidDate(dateString) {
  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split('/');
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
