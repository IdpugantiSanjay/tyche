import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecord } from '../models/record';

@Component({
  selector: 'record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input('data') record: IRecord;

  @Output('delete') eventEmitter = new EventEmitter<IRecord>();

  constructor() {}

  ngOnInit() {}

  // onValueFocusEvent(event: Event) {
  //   (event.target as any).innerHTML = (event.target as any).innerHTML.trim().replace('₹', '');
  // }

  // onValueBlurEvent(event: Event) {
  //   const value = (event.target as any).innerHTML;

  //   if (value) {
  //     (event.target as any).innerHTML = (event.target as any).innerHTML.trim() + '₹';
  //   } else {
  //     (event.target as any).innerHTML = '0₹';
  //   }
  // }

  public onDeleteButtonClick() {
    this.eventEmitter.emit(this.record);
  }
}
