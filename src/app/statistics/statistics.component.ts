import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';

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

type BudgetConsumption = { name: string; percentageConsumed: number; consumed: number; label: string };

export enum BudgetName {
  DAILY = 'dailyBudget',
  WEEKLY = 'weeklyBudget',
  MONTHLY = 'monthlyBudget',
  YEARLY = 'yearlyBudget'
}
