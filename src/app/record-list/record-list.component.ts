import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { RecordsService } from "../services/records.service";
import { IRecord, Records } from "../models/record";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { BudgetService } from "../services/budget.service";
import { Budget } from "../models/budget";

@Component({
  selector: "app-record-list",
  templateUrl: "./record-list.component.html",
  styleUrls: ["./record-list.component.css"]
})
export class RecordListComponent implements OnInit {
  records$: Observable<Records>;

  constructor(private recordsService: RecordsService) {}

  ngOnInit() {
    this.initializeRecords();
  }

  private get records() {
    return this.recordsService.searchRecords();
  }

  private initializeRecords() {
    this.records$ = this.records;
  }

  // event listners

  public onRecordDelete(record: IRecord) {
    this.recordsService
      .deleteRecord(record)
      .pipe(
        tap(() => this.initializeRecords()),
        tap(() => this.recordsService.recordsModified()) // send signal that records are modified to other subscribed observers
      )
      .subscribe();
  }
}
