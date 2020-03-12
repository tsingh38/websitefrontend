import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { productItem } from '../models/product.interface';
import { catchError, retry } from 'rxjs/operators';
import { customerOrder } from '../models/customerorder.interface';
import { CustOrderStatus } from '../models/custOrderStatus.interface';
import { WebsiteStatusInterface } from '../models/websiteStatus.interface';
import { CredentialsChangeInterface } from '../models/CredentialsChange.interface';

@Injectable()
export class HttpUtil {
  loginURL: string = "http://localhost:8080/Lastrada/authenticate";
  getItemsURL: string = "http://localhost:8080/Lastrada/allitems";
  saveOrderURL: string = "http://localhost:8080/Lastrada/saveOrder";
  getCustOrderURL: string = "http://localhost:8080/Lastrada/getOrders";
  updateCustOrderUL: string = "http://localhost:8080/Lastrada/updateOrder";
  logoutURL: string = "http://localhost:8080/Lastrada/logout";
  getWebsiteStatusURL: string = "http://localhost:8080/Lastrada/getWebsiteStatus";
  updateWebsiteStatusURL: string = "http://localhost:8080/Lastrada/updateWebsiteStatus";
  changeCredentialsURL: string = "http://localhost:8080/Lastrada/processChangeCredentials";
  deleteProductURL:string="http://localhost:8080/Lastrada/deleteProduct";
  addProductURL:string="http://localhost:8080/Lastrada/saveProduct";
  editProductURL:string="http://localhost:8080/Lastrada/editProduct";


  constructor(private http: HttpClient) {
  }

  fetchAllItems() {
    return this.http.get<productItem>(this.getItemsURL);
  }


  changeCredentials(credObj: CredentialsChangeInterface) {
    return this.http.post(this.changeCredentialsURL, credObj);

  }
  getWebsiteStatus() {
    return this.http.get<WebsiteStatusInterface>(this.getWebsiteStatusURL);
  }

  updateWebsiteStatus(statusObj: WebsiteStatusInterface) {
    return this.http.post<WebsiteStatusInterface>(this.updateWebsiteStatusURL, statusObj);
  }

  fetchAllCustOrders(ordersFetchCategory: string) {
    const headerDict = {
      'selectOrders': ordersFetchCategory,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'CustOrderFetchMode': ordersFetchCategory,

      })
    };
    return this.http.get<CustOrderStatus>(this.getCustOrderURL, httpOptions);
  }

  saveOrder(order: customerOrder) {
    return this.http.post<number>(this.saveOrderURL, order);
  }

  deleteProduct(product:productItem){
    return this.http.post(this.deleteProductURL,product);
  }
  
  editProduct(product:productItem){
    return this.http.post(this.editProductURL,product);
  }
  addProduct(product:productItem){
    return this.http.post(this.addProductURL,product);
  }
  updateCustOrderStatus(custOrder: CustOrderStatus) {
    return this.http.post<number>(this.updateCustOrderUL, custOrder);
  }

  loginUser(username: string, password: string) {
    const payload = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<string>(this.loginURL, payload);
  }

  logoutUser() {
    return this.http.get(this.logoutURL);
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