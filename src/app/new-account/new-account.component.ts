import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormGroupHelper } from '../helpers/form-group-helper';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  form: FormGroup;
  formGroupHelper: FormGroupHelper;

  constructor(public dialogRef: MatDialogRef<NewAccountComponent>) {}

  ngOnInit() {
    this.form = this.formGroup;

    this.formGroupHelper = new FormGroupHelper(this.form);
  }

  get formGroup() {
    const form = new FormGroup({
      balance: new FormControl('', Validators.compose([Validators.required])),
      accountName: new FormControl('', Validators.maxLength(120))
    });

    return form;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onAccountSaveClick(): void {
    this.dialogRef.close(this.formGroupHelper.keyValuePairs());
  }

  onBalancePasteEvent(event: ClipboardEvent) {
    let clipboardData = event.clipboardData || (window as any).clipboardData;
    let pastedText = clipboardData.getData('text');

    if (!Number(pastedText)) {
      event.preventDefault();
      return;
    }

    this.formGroupHelper.setValue('balance', pastedText);
  }
}
