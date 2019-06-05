import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NewAccountComponent } from '../new-account/new-account.component';
import { filter, switchMap, mergeMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  showTransactions: boolean = false;

  accounts: Observable<IAccount[]>;

  constructor(public dialog: MatDialog, private accountService: AccountService) {}

  ngOnInit() {
    this.populateUserAccounts();
  }

  onViewTransactionsClick() {
    this.showTransactions = !this.showTransactions;
  }

  onAddAccountClickEvent() {
    var dialogRef = this.dialog.open(NewAccountComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((account: IAccount) => !!account),
        switchMap(account => this.accountService.saveAccount(account))
      )
      .subscribe(() => this.populateUserAccounts);
  }

  populateUserAccounts() {
    this.accounts = this.accountService.getUserAccounts();
  }
}
