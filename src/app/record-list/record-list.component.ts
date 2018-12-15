import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { IRecord, Records } from '../models/record';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records: Observable<Records>;

  todayTotal: Observable<number>;
  thisWeekTotal: Observable<number>;
  thisMonthTotal: Observable<number>;
  thisYearTotal: Observable<number>;

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.records = this.recordsService.searchRecords();

    const today = new Date();
    const tommorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const [thisYear, thisMonth] = [today.getFullYear(), today.getMonth()];

    this.thisMonthTotal = this.recordsService.getTotalAmount(
      new Date(thisYear, thisMonth, 1),
      new Date(thisYear, thisMonth + 1, 0)
    ) as Observable<number>;

    today.setHours(0, 0, 0, 0);
    tommorrow.setHours(0, 0, 0);
    this.todayTotal = this.recordsService.getTotalAmount(today, tommorrow) as Observable<number>;

    this.thisYearTotal = this.recordsService.getTotalAmount(
      new Date(thisYear, 0, 1),
      new Date(thisYear, 11, 31)
    ) as Observable<number>;
  }

  // event listners

  public onRecordDelete(record: IRecord) {
    this.recordsService.deleteRecord(record).subscribe(serviceResponse => console.log(serviceResponse));
  }

  public onTodayClick() {
    this.recordsService
      .getTotalAmount(new Date(2018, 0, 1), new Date(2019, 0, 1))
      .subscribe(serviceResponse => console.log(serviceResponse));
  }
}
