import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

import * as _ from 'lodash';
import { pluck, flatMap, tap, filter, map, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';
import { SettingsService } from '../services/settings.service';
import { user } from 'src/environments/environment.prod';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  featuresForm: FormGroup;
  accountsForm: FormGroup;

  formHelper: FormGroupHelper;
  featuresFormHelper: FormGroupHelper;
  accountsFormHelper: FormGroupHelper;

  accounts: Observable<Array<IAccount>>;

  constructor(
    private recordsService: RecordsService,
    private budgetsService: BudgetService,
    private settingsService: SettingsService,
    private accountsService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formGroup;
    this.featuresForm = this.featuresFromGroup;
    this.accountsForm = this.accountsFormGroup;

    this.formHelper = new FormGroupHelper(this.form);
    this.featuresFormHelper = new FormGroupHelper(this.featuresForm);
    this.accountsFormHelper = new FormGroupHelper(this.accountsForm);

    this.budgetsService.budgets().subscribe((budgets: Budget[]) => {
      for (const budget of budgets) {
        this.form.controls[budget.name].setValue(budget.value);
      }
    });

    this.settingsService
      .userSettings()
      .pipe(
        filter((settings: any) => !!settings),
        tap(settings => (settings = settings))
      )
      .subscribe((settings: any) => {
        this.settingsService.emitAccountSettingChangedEvent(settings.isAccountEnabled);
        this.featuresFormHelper.setValue('isTagsEnabled', settings.isTagsEnabled);
        this.featuresFormHelper.setValue('isAccountEnabled', settings.isAccountEnabled);
      });

    this.accounts = this.accountsService.getUserAccounts();
  }

  onExportButtonClick() {
    this.recordsService
      .exportRecords()
      .pipe(pluck('data'))
      .subscribe(downloadCSV);
  }

  onSaveButtonClick() {
    const enteredBudgets: Array<Budget> = _.keys(this.form.controls)
      .filter(key => !!this.form.controls[key])
      .map(key => ({ name: key, value: +this.form.controls[key].value }));

    this.budgetsService.saveBudgets(enteredBudgets).subscribe();
  }

  onFeatureSaveButtonClick() {
    var keyValuePair = this.featuresFormHelper.keyValuePairs();

    this.saveUserSettings(keyValuePair);
  }

  private saveUserSettings(keyValuePair) {
    this.settingsService
      .saveSettings(keyValuePair)
      .pipe(
        filter((settings: any) => !!settings),
        tap(settings => (settings = settings))
      )
      .subscribe((settings: any) => {
        if (settings) {
          this.settingsService.emitAccountSettingChangedEvent(settings.isAccountEnabled);
        }
      });
  }

  get formGroup() {
    return new FormGroup({
      dailyBudget: new FormControl(0),
      weeklyBudget: new FormControl(0),
      monthlyBudget: new FormControl(0),
      yearlyBudget: new FormControl(0)
    });
  }

  get featuresFromGroup() {
    return new FormGroup({
      isAccountEnabled: new FormControl(false),
      isTagsEnabled: new FormControl(false)
    });
  }

  get accountsFormGroup() {
    return new FormGroup({
      balance: new FormControl()
    });
  }

  public onAccountDeleteClick(account: IAccount) {
    this.accountsService
      .deleteUserAccount(account)
      .pipe(tap(() => (this.accounts = this.accountsService.getUserAccounts())))
      .subscribe();
  }

  public accountBalanceFocusOut(account: IAccount) {
    this.accountsService
      .updateUserAccount(account)
      .pipe(
        tap((response: IAccount) => (account = response)),
        switchMap(() => (this.accounts = this.accountsService.getUserAccounts()))
      )
      .subscribe();
  }
}

/**
 * Download a csv file
 * @param base64String
 */
function downloadCSV(base64String: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/csv;charset=utf-8,' + atob(base64String));
  element.setAttribute('download', _.uniqueId('export_') + '.csv');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
