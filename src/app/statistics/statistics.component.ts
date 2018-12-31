import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';

import { Range } from '../helpers/range';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats$: Observable<BudgetConsumption>;

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.initializeStatistics();
    this.recordsService.changed$.subscribe(() => this.initializeStatistics());
  }

  private initializeStatistics() {
    this.stats$ = this.recordsService.statistics() as Observable<BudgetConsumption>;
  }
}

type BudgetConsumption = { name: string; percentageConsumed: number; consumed: number; label: string };

export enum BudgetName {
  DAILY = 'dailyBudget',
  WEEKLY = 'weeklyBudget',
  MONTHLY = 'monthlyBudget',
  YEARLY = 'yearlyBudget'
}
