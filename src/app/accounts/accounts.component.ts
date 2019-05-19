import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  showTransactions: boolean = false;

  constructor() {}

  ngOnInit() {}

  onViewTransactionsClick() {
    this.showTransactions = !this.showTransactions;
  }
}
