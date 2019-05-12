import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';

import { BudgetConsumption } from '../types/BudgetConsumption.type';
import { Range } from '../helpers/range';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats$: Observable<Array<BudgetConsumption>>;

  @Output('filterChange') filterChange: EventEmitter<{
    startDate: Date;
    endDate: Date;
  }> = new EventEmitter();

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.initializeStatistics();
    this.recordsService.changed$.subscribe(() => this.initializeStatistics());
  }

  private initializeStatistics() {
    this.stats$ = this.recordsService.statistics() as Observable<Array<BudgetConsumption>>;
  }

  public onStatClick(label: string) {
    switch (label) {
      case 'TODAY':
        var [startDate, endDate] = Range.day;
        break;
      case 'THIS WEEK':
        var [startDate, endDate] = Range.week;
        break;
      case 'THIS MONTH':
        var [startDate, endDate] = Range.month;
        break;
      case 'THIS YEAR':
        var [startDate, endDate] = Range.year;
        break;
    }

    this.filterChange.emit({ startDate, endDate });
  }
}

export enum BudgetName {
  DAILY = 'dailyBudget',
  WEEKLY = 'weeklyBudget',
  MONTHLY = 'monthlyBudget',
  YEARLY = 'yearlyBudget'
}
