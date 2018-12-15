import { Component, OnInit, Input } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  thisMonthTotal: Observable<number>;
  todayTotal: Observable<number>;
  thisYearTotal: Observable<number>;
  weekTotal: Observable<number>;

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.todayTotal = this.recordsService.getTotalAmount(...this.dayRange) as Observable<number>;
    this.weekTotal = this.recordsService.getTotalAmount(...this.weekRange) as Observable<number>;
    this.thisMonthTotal = this.recordsService.getTotalAmount(...this.monthRange) as Observable<number>;
    this.thisYearTotal = this.recordsService.getTotalAmount(...this.yearRange) as Observable<number>;
  }

  get dayRange(): [Date, Date] {
    const today = new Date();
    const tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    today.setHours(0, 0, 0, 0);
    tommorrow.setHours(0, 0, 0);
    return [today, tommorrow];
  }

  get monthRange(): [Date, Date] {
    const [thisMonth, thisYear] = [new Date().getMonth(), new Date().getFullYear()];
    return [new Date(thisYear, thisMonth, 1), new Date(thisYear, thisMonth + 1, 0)];
  }

  get yearRange(): [Date, Date] {
    const thisYear = new Date().getFullYear();
    return [new Date(thisYear, 0, 1), new Date(thisYear, 11, 31)];
  }

  get weekRange(): [Date, Date] {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));

    return [firstday, lastday];
  }
}
