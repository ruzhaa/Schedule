import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParams,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _API_URL: string = environment.API_URL;

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('http') || req.url.startsWith('file')) {
            return next.handle(req).pipe(
                tap((response: HttpResponse<any>) => {
                    return response instanceof HttpResponse ? response.body : response;
                }),
                catchError(this._catchAction)
            );
        } else {
            const req_url = `${this._API_URL}${req.url.charAt(0) !== '/' ? '/' : ''}${req.url}`;

            const params: HttpParams = req.params;
            const auth_req: HttpRequest<any> = req.clone({
                url: req_url,
                params,
            });

            return next.handle(auth_req);
        }
    }

    private _catchAction(err: HttpErrorResponse): Observable<never> {
        if (err.status === 401) return null;

        if (err.status && err.status !== 200) {
            console.error(err);
            return throwError(err);
        }
    }
}
