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

  // Observer of Accounts
  accounts: Observable<Array<IAccount>>;

  constructor(public dialog: MatDialog, private accountService: AccountService) { }

  ngOnInit() {

    // assign user accounts observer
    this.accounts = this.accountService.getUserAccounts();
  }

  /**
   * Fires when user clicked Add Account button
   */
  onAddAccountClickEvent() {
    var dialogRef = this.dialog.open(NewAccountComponent);

    // save the account details entered by user
    dialogRef
      .afterClosed()
      .pipe(
        filter((account: IAccount) => !!account), // do not proceed if cancel is clicked
        // TODO: probably switch match isn;t the right way here
        // Replace switchMap with something identical
        switchMap(account => this.accountService.saveAccount(account)), // Network Request to Save Account Info
        tap(() => (this.accounts = this.accountService.getUserAccounts())) // Get All User Accounts Including newly added Account
      )
      .subscribe();
  }
}
