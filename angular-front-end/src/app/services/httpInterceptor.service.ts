import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse }
    from '@angular/common/http';

import { Observable, of, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(public router: Router) { }

     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercepted\n");
        //const token: string = 'invald token';
        //req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        return next.handle(req).pipe(
            catchError((error) => {
                let handled: boolean = false;
                console.error(error);
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    } else {
                        console.log(`error status : ${error.status} ${error.statusText}`);

                        switch (error.status) {
                            case 0:       //Unknown Error
                                this.router.navigateByUrl("/error");
                                console.log(`redirect to error`);
                                handled = true;
                                break;
                            case 404:      //Not found
                                this.router.navigateByUrl("/error");
                                console.log(`redirect to error`);
                                handled = true;
                                break;
                            case 401:      //Unauthorized
                                this.router.navigateByUrl("/home");
                                console.log(`redirect to home`);
                                handled = true;
                                break;
                            case 403:     //forbidden
                                this.router.navigateByUrl("/home");
                                console.log(`redirect to login`);
                                handled = true;
                                break;
                            case 500:      //Internal Server Error
                                this.router.navigateByUrl("/error");
                                console.log(`redirect to error`);
                                handled = true;
                                break;
                            default:       //An error occurred
                                this.router.navigateByUrl("/error");
                                console.log(`redirect to error`);
                                handled = true;
                        }
                    }
                } else {
                    console.error("Other Errors");
                }
                if (handled) {
                    console.log('return back ');
                    return of(error);
                } else {
                    console.log('throw error back to to the subscriber');
                    return throwError(() => new Error(error));
                }
            })
        );
    } 

}