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

  // maintan state wheather to show account transactions or not
  public showTransactions = false;

  // Observable of account transactions
  public accountTransactions: Observable<Array<IRecord>>;

  // variable to maintain if no transactions are available for the account
  public noRecords: boolean = false;

  constructor(private recordService: RecordsService) { }

  ngOnInit() {
    // get top 10 account transactions
    this.accountTransactions = this.recordService
      .searchRecords({
        limit: 10,
        skip: 0,
        accountId: this.account._id
      })
      .pipe(
        tap((records: Array<IRecord>) => {
          if (records.length == 0) this.noRecords = true; // if account doesn't have any transactions maintain state
          // replace string with more than 15 characters with ...
          records
            .filter(record => record.description.length > 15)
            .map(record => (record.description = record.description.slice(0, 15) + '...'));
        })
      );
  }

  /**
   * Fires when View Transaction Button is clicked
   */
  onViewTransactionsClick() {
    if (this.noRecords) return;
    this.showTransactions = !this.showTransactions;
  }
}
