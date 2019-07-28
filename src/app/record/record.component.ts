import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { IRecord } from "../models/record";

@Component({
  selector: "record",
  templateUrl: "./record.component.html",
  styleUrls: ["./record.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent implements OnInit {
  @Input("data") record: IRecord;
  // @Input("color") color: string;
  @Output("delete") deleteEventEmitter = new EventEmitter<IRecord>();
  @Output("addSimilar") addSimilarEventEmitter = new EventEmitter<IRecord>();

  isFocused = false;

  showTags = true;

  color: string;

  constructor() {}

  ngOnInit() {
    this.color =
      this.record.type === 2
        ? this.record.value > 100
          ? "red"
          : this.record.value > 70
          ? "orange"
          : "green"
        : "black";
  }

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
