import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book';
import { DataService } from './data.service';
import { BookTrackerError } from '../models/bookTrackerError';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

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
