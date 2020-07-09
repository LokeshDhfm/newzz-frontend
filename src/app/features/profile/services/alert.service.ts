import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public snackBar: MatSnackBar) { }

  public displaySnackBar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      verticalPosition: 'bottom',
      politeness: 'polite'
    });
  }

  getSnackBar() {
    return this.snackBar;
  }
}
