import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewAccountComponent } from '../new-account/new-account.component';
import { filter, switchMap, tap } from 'rxjs/operators';
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
        switchMap(account => this.accountService.saveAccount(account)),
        tap(() => (this.accounts = this.accountService.getUserAccounts()))
      )
      .subscribe();
  }

  populateUserAccounts() {
    this.accounts = this.accountService.getUserAccounts();
  }
}
