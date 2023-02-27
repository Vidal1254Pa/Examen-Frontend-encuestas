import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('auth_token');
    // if (!token) {
    //     return next.handle(req);
    // }
    // const headers = req.clone({
    //     headers: req.headers.set('Authorization', `Bearer ${token}`)
    // });
    // return next.handle(headers);
    // }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let storageKeyIdToken = ''
        const keys = Object.keys(localStorage)
        for (let key of keys) {
            if(key.indexOf('-idtoken-') > -1) {
                storageKeyIdToken = key;
                // console.log(`${key}: ${localStorage.getItem(key)}`)
                break;
            }
        }

        let parametros = {
            url: `${environment.API_URL}${req.url}`
        }

        if(storageKeyIdToken) {
           const tokenKeys = JSON.parse(localStorage.getItem(storageKeyIdToken));
           if(tokenKeys.secret) {
            parametros['setHeaders'] = {
                authorization: `Bearer ${tokenKeys.secret}`
            }
           }
        }

        const apiReq = req.clone(parametros);
        return next.handle(apiReq);
    }
}