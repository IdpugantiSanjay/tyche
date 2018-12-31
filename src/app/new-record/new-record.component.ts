import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RecordsService } from '../services/records.service';
import { IRecord } from '../models/record';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { ErrorHandlerService } from '../services/error-handler.service';
import { tap } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';

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

  expenseCategories = [];
  incomeCategories = [];
  categories = [];

  constructor(
    private categoryService: CategoryService,
    private recordsService: RecordsService,
    private router: Router,
    private notificationService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.form = this.formGroup;
    this.formGroupHelper = new FormGroupHelper(this.form);

    this.categoryService
      .categories('Income')
      .pipe(tap((categories: any[]) => (this.incomeCategories = categories)))
      .subscribe();

    this.categoryService
      .categories('Expense')
      .pipe(tap((categories: any[]) => (this.expenseCategories = categories)))
      .pipe(tap((categories: any[]) => (this.categories = categories)))
      .subscribe();
  }

  onSubmitButtonClick() {
    this.recordsService.createRecord(this.record).subscribe(() => this.router.navigateByUrl('/home/list'));
  }

  /**
   * clear all form field values
   */
  onClearButtonClick() {
    this.formGroupHelper.clear();
  }

  public onRecordTypeChange(event: any) {
    switch (event.value) {
      case 1:
        this.categories = this.incomeCategories;
        break;
      case 2:
        this.categories = this.expenseCategories;
    }

    this.form.controls['category'].setValue(this.categories[0].name);
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
    const time = this.formGroupHelper.getValue('time') as string;

    return new Date(date.toDateString() + ' ' + time);
  }

  get formGroup() {
    return new FormGroup({
      type: new FormControl(2, Validators.compose([Validators.required])),
      category: new FormControl('Food and Drinks', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl('', Validators.maxLength(120)),
      date: new FormControl(new Date(), Validators.required),
      time: new FormControl(new Date().toTimeString())
    });
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
