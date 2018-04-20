import { Component, OnInit, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'app/core/data.service';
import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';

import { BookTrackerError } from '../models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private dataService: DataService,
    private title: Title,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const books: Book[] | BookTrackerError = this.route.snapshot.data['books'];

    if (books instanceof BookTrackerError) {
      console.log(`Dashboard component error: ${books.friendlyMessage}`);
    } else {
      this.allBooks = books;
    }

    this.allReaders = this.dataService.getAllReaders();
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    this.dataService.deleteBook(bookID).subscribe(
      (data: void) => {
        const index: number = this.allBooks.findIndex(
          book => book.bookID === bookID
        );
        this.allBooks.splice(index, 1);
      },
      (err: any) => console.log(err)
    );
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
