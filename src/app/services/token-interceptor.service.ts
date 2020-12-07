import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next): Observable<HttpEvent<any>> {
    const userService = this.injector.get(UserService);
    const tokenizeReq = req.clone({
      setHeader: {
        Authorization: `Bearer ${userService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
