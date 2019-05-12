import { Component, OnInit, Input } from '@angular/core';

import { BudgetConsumption } from '../types/BudgetConsumption.type';

@Component({
  selector: 'statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  @Input('stat') stat: BudgetConsumption;

  constructor() {}

  ngOnInit() {}
}
