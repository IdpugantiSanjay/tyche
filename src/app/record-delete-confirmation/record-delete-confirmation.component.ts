import { Component, OnInit } from '@angular/core';
import { user } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-record-delete-confirmation',
  templateUrl: './record-delete-confirmation.component.html',
  styleUrls: ['./record-delete-confirmation.component.css']
})
export class RecordDeleteConfirmationComponent implements OnInit {
  username: string;

  constructor(public dialogRef: MatDialogRef<RecordDeleteConfirmationComponent>) {}

  ngOnInit() {
    this.username = user.name;
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
