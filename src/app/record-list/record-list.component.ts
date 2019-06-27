import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { IRecord, Records } from '../models/record';
import { Observable } from 'rxjs';
import { switchMap, tap, debounceTime, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecordDeleteConfirmationComponent } from '../record-delete-confirmation/record-delete-confirmation.component';

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  records$: Observable<Records>;

  constructor(private recordsService: RecordsService, private router: Router, public dialog: MatDialog) {}

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
    var dialog = this.dialog.open(RecordDeleteConfirmationComponent);

    dialog
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(() => this.deleteRecord(record).subscribe());
  }

  private deleteRecord(record: IRecord) {
    return this.recordsService.deleteRecord(record).pipe(
      tap(() => this.initializeRecords()),
      tap(() => this.recordsService.recordsModified(true)) // send signal that records are modified to other subscribed observers
    );
  }

  public onFilterChange(filter: { startDate: Date; endDate: Date }) {
    this.records$ = this.recordsService.searchRecords(filter);
  }
}
