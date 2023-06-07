import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() { }

  handleError(error: Error | HttpErrorResponse) {
    console.log('GlobalErrorHandlerService')
    console.error(error);
/* 
    if (error instanceof HttpErrorResponse) {

      switch (error.status) {
        case 0:
          return throwError(() => new Error('Unknown error: ' + error.status));
        case 404:
          return throwError(() => new Error('User not found: ' + error.status));
        case 401:
          return throwError(() => new Error('Unauthorized: ' + error.status));
        case 403:
          return throwError(() => new Error('Forbidden: ' + error.status));
        case 500:
          return throwError(() => new Error('Internal Server Error: ' + error.status));
        default:
          return throwError(() => new Error('An error occurred: ' + error.status));
      }

    } else {
      throw error;
    } */
  }

} 