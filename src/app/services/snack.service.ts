import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  public authError(): Subscription | undefined {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef?.onAction()
      .pipe(
        tap(() => this.router.navigate(['/login']))
      )
      .subscribe();
  }
}
