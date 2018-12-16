import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private snackbar: MatSnackBar) {}

  handleError(error: any) {
    this.snackbar.open(error.message, 'close', { duration: 1000 });
  }
}
