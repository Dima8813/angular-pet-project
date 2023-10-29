import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { AuthService } from '@shared/services';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.authService.getAccessToken();

    if (myToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }

    return next.handle(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.error('AccessTokenInterceptor check');
          if (err.status === 401) {
            console.error('Token is expired, please login again');
          }
        }
        return throwError(() => new Error('Some other error occurred'));
      })
    );
  }
}
