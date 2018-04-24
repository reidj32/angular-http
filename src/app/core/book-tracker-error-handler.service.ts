import { ErrorHandler, Injectable } from '@angular/core';

import { BookTrackerError } from '../models/book-tracker-error';

@Injectable()
export class BookTrackerErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    const customError: BookTrackerError = new BookTrackerError();
    customError.errorNumber = 200;
    customError.message = (<Error>error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';

    console.log(customError);
  }

  constructor() {}
}
