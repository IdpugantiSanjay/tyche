import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  months = ['January', 'Febuary'];

  constructor() {}

  ngOnInit() {}

  onValueFocusEvent(event: Event) {
    (event.target as any).innerHTML = (event.target as any).innerHTML
      .trim()
      .replace('₹', '');
  }

  onValueBlurEvent(event: Event) {
    const value = (event.target as any).innerHTML;

    if (value) {
      (event.target as any).innerHTML = (event.target as any).innerHTML.trim() + '₹';
    } else {
      (event.target as any).innerHTML = '0₹';
    }
  }
}
