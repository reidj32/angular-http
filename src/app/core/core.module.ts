import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from 'app/core/module-import-guard';

import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { BooksResolver } from './books-resolver.service';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    BooksResolver
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
