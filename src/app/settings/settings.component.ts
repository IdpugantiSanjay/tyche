import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';

import * as _ from 'lodash';
import { pluck, flatMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  formHelper: FormGroupHelper;

  constructor(private recordsService: RecordsService, private budgetsService: BudgetService) {}

  ngOnInit() {
    this.form = this.formGroup;
    this.formHelper = new FormGroupHelper(this.form);

    this.budgetsService.budgets().subscribe((budgets: Budget[]) => {
      for (const budget of budgets) {
        this.form.controls[budget.name].setValue(budget.value);
      }
    });
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

  get formGroup() {
    return new FormGroup({
      dailyBudget: new FormControl(0),
      weeklyBudget: new FormControl(0),
      monthlyBudget: new FormControl(0),
      yearlyBudget: new FormControl(0)
    });
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