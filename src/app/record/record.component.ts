import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRecord } from '../models/record';

@Component({
  selector: 'record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input('data') record: IRecord;
  @Input('color') color: string;
  @Output('delete') deleteEventEmitter = new EventEmitter<IRecord>();
  @Output('addSimilar') addSimilarEventEmitter = new EventEmitter<IRecord>();

  isFocused = false;

  showTags = true;

  constructor() {}

  ngOnInit() {}

  public onDeleteButtonClick() {
    this.deleteEventEmitter.emit(this.record);
  }

  public onAddSimilarRecordButtonClick() {
    this.addSimilarEventEmitter.emit(this.record);
  }

  public hideCardTags() {
    this.showTags = false;
  }

  public showCardTags() {
    this.showTags = true;
  }
}
