import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';

import { BudgetConsumption } from '../types/BudgetConsumption.type';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stats$: Observable<Array<BudgetConsumption>>;

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.initializeStatistics();
    this.recordsService.changed$.subscribe(() => this.initializeStatistics());
  }

  private initializeStatistics() {
    this.stats$ = this.recordsService.statistics() as Observable<Array<BudgetConsumption>>;
  }
}

export enum BudgetName {
  DAILY = 'dailyBudget',
  WEEKLY = 'weeklyBudget',
  MONTHLY = 'monthlyBudget',
  YEARLY = 'yearlyBudget'
}
