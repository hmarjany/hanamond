import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthService } from '../service/Auth/auth.service';
import { LoaderService } from '../service/Loader/loader.service';
import { finalize, retry, catchError } from 'rxjs/operators';
import { server } from './server';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,
        private loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url != "https://api.hanamond.ir/product/search") {
            this.loaderService.show();
            
        }
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(server.serverUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        console.log(request);

        return next.handle(request).pipe(
            retry(1),

            catchError((error: HttpErrorResponse) => {

                let errorMessage = '';

                if (error instanceof ErrorEvent) {

                    errorMessage = `Error: ${error}`;

                } else {

                    // server-side error

                    errorMessage = `${error}`;

                }

                return throwError(errorMessage);

            }),

            finalize(() => {
                if (request.url != "https://api.hanamond.ir/product/search") {
                    this.loaderService.hide();
                }
            }
            )
        );
    }
}