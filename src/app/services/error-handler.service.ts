import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private snackbar: MatSnackBar) { }

  handleError(payload: any) {
    if (payload && payload.error && payload.error.message)
      this.snackbar.open(payload.error.message, 'close', { duration: 1000 });
  }
}
