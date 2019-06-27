import { Component, OnInit } from '@angular/core';
import { user } from 'src/environments/environment.prod';
import { MatDialogRef } from '@angular/material/dialog';

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
