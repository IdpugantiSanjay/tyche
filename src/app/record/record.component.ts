import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IRecord } from "../models/record";

@Component({
  selector: "record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.css"]
})
export class RecordComponent implements OnInit {
  @Input("data") record: IRecord;
  @Input("color") color: string;
  @Output("delete") eventEmitter = new EventEmitter<IRecord>();

  constructor() {}

  ngOnInit() {}

  public onDeleteButtonClick() {
    this.eventEmitter.emit(this.record);
  }
}
