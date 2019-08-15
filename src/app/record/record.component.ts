import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IRecord } from '../models/record';

@Component({
  selector: 'record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent implements OnInit {
  @Input('data') record: IRecord;
  // @Input("color") color: string;
  @Output('delete') deleteEventEmitter = new EventEmitter<IRecord>();

  constructor() {}

  ngOnInit() {}

  public onDeleteButtonClick() {
    this.deleteEventEmitter.emit(this.record);
  }
}
