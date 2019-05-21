import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewAccountComponent } from '../new-account/new-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  showTransactions: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onViewTransactionsClick() {
    this.showTransactions = !this.showTransactions;
  }

  onAddAccountClickEvent() {
    this.dialog.open(NewAccountComponent);
  }
}
