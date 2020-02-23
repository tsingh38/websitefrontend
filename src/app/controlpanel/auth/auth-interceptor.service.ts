import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ControlPanelService } from 'src/app/services/controlpanel.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
 constructor(private controlPanelService: ControlPanelService){
 }

intercept(req:HttpRequest<any>,next:HttpHandler){
    if(req.headers && req.url.indexOf('authenticate') > 0){
        return next.handle(req);
    }
    if(localStorage.getItem('token') ===null){
        return next.handle(req);
    }
   
    let headers: HttpHeaders = req.headers;
    headers = headers.append('Authorization', 'Bearer '+localStorage.getItem('token'));
  


    const authReq = req.clone({ headers: headers });

    return next.handle(authReq);
}
}