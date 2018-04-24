import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Book } from '../models/book';
import { BookTrackerError } from '../models/book-tracker-error';
import { DataService } from './data.service';

@Injectable()
export class BooksResolver implements Resolve<Book[] | BookTrackerError> {
  constructor(private dataService: DataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks().pipe(catchError(err => of(err)));
  }
}
