import { Component, OnInit, Input } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs';
import { IRecord } from '../models/record';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  @Input('account') account: IAccount;

  public showTransactions = false;

  public accountTransactions: Observable<IRecord[]>;

  public noRecords: boolean = false;

  constructor(private recordService: RecordsService) {}

  ngOnInit() {
    this.accountTransactions = this.recordService
      .searchRecords({
        limit: 10,
        skip: 0,
        accountId: this.account._id
      })
      .pipe(
        tap((records: IRecord[]) => {
          if (records.length == 0) this.noRecords = true;
          records
            .filter(record => record.description.length > 15)
            .map(record => (record.description = record.description.slice(0, 15) + '...'));
        })
      );
  }

  onViewTransactionsClick() {
    if (this.noRecords) return;
    this.showTransactions = !this.showTransactions;
  }
}
