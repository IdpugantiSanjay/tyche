import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecordsService } from '../services/records.service';
import { IRecord } from '../models/record';
import { Router } from '@angular/router';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { ErrorHandlerService } from '../services/error-handler.service';
import { tap, distinctUntilChanged } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  recordTypes = [{ value: 1, viewValue: 'Income' }, { value: 2, viewValue: 'Expenditure' }];

  form: FormGroup;
  formGroupHelper: FormGroupHelper;

  tagFormControl: FormControl = new FormControl();

  accountControl: FormControl = new FormControl(0);

  expenseCategories = [];
  incomeCategories = [];
  categories = [];

  accounts$: Observable<Array<IAccount>>;

  fieldsConfiguaration = {
    isAccountEnabled: true,
    isTagsEnabled: false
  };

  constructor(
    private categoryService: CategoryService,
    private recordsService: RecordsService,
    private router: Router,
    private notificationService: ErrorHandlerService,
    private accountService: AccountService
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

    this.accounts$ = this.accountService
      .getUserAccounts()
      .pipe(tap(accounts => accounts.unshift({ _id: 0, accountName: 'Cash', balance: 0 } as any)));

    this.tagFormControl.valueChanges.pipe(distinctUntilChanged()).subscribe((value: string) => {
      // replace any double spaces with single space
      this.tagFormControl.setValue(value.replace(/\s\s+/g, ' '));

      // the value should only start with '#'
      if (!value.startsWith('#')) {
        this.tagFormControl.setValue('');
      }

      if (value.includes(' ')) {
        const hasthags = value.split(' ');

        if (hasthags.every(hastag => !!hastag)) {
          this.tagFormControl.setValue(
            hasthags.filter((hasthag: string) => hasthag.startsWith('#')).join(' ')
          );
        }
      }
    });
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
    record.accountId = this.formGroupHelper.getValue('accountId');

    // delete accountId if cash is selected
    if (!record.accountId) delete record.accountId;

    return record;
  }

  get time(): Date {
    const date = this.formGroupHelper.getValue('date') as Date;
    const time = this.formGroupHelper.getValue('time') as string;

    return new Date(date.toDateString() + ' ' + time);
  }

  get formGroup() {
    const form = new FormGroup({
      type: new FormControl(2, Validators.compose([Validators.required])),
      category: new FormControl('Food and Drinks', Validators.compose([Validators.required])),
      amount: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl('', Validators.maxLength(120)),
      date: new FormControl(new Date(), Validators.required),
      time: new FormControl(new Date().toTimeString())
    });

    if (this.fieldsConfiguaration.isTagsEnabled) {
      form.addControl('tags', this.tagFormControl);
    }

    if (this.fieldsConfiguaration.isAccountEnabled) {
      form.addControl('accountId', this.accountControl);
    }

    return form;
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
