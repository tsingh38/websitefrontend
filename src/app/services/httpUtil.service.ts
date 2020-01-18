import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { productItem } from '../models/product.interface';
import { catchError, retry } from 'rxjs/operators';
import { customerOrder } from '../models/customerorder.interface';

@Injectable()
export class HttpUtil{

 getItemsURL:string="http://localhost:8080/allitems";
 saveOrderURL:string="http://localhost:8080/saveOrder";

    constructor(private http:HttpClient){
    }

fetchAllItems(){
    return this.http.get<productItem>(this.getItemsURL);
}

saveOrder(order:customerOrder){
   return  this.http.post<number>(this.saveOrderURL,order);
}
    
private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}