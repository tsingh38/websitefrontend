import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { productItem } from '../models/product.interface';
import { catchError, retry } from 'rxjs/operators';
import { customerOrder } from '../models/customerorder.interface';
import { CustOrderStatus } from '../models/custOrderStatus.interface';
import { WebsiteStatusInterface } from '../models/websiteStatus.interface';
import { CredentialsChangeInterface } from '../models/CredentialsChange.interface';
import {environment} from '../../environments/environment';
import { OrderNotificationSoundInterface } from '../models/orderNotificationSound.interface';

@Injectable() 
export class HttpUtil {
  
  loginURL: string = environment.ServerURL+'authenticate';
  getItemsURL: string = environment.ServerURL+'allitems';
  saveOrderURL: string = environment.ServerURL+'saveOrder';
  getCustOrderURL: string = environment.ServerURL+'getOrders';
  updateCustOrderUL: string = environment.ServerURL+'updateOrder';
  logoutURL: string = environment.ServerURL+'logout';
  getWebsiteStatusURL: string = environment.ServerURL+'getWebsiteStatus';
  updateWebsiteStatusURL: string = environment.ServerURL+'updateWebsiteStatus';
  changeCredentialsURL: string = environment.ServerURL+'processChangeCredentials';
  deleteProductURL:string=environment.ServerURL+'deleteProduct';
  addProductURL:string=environment.ServerURL+'saveProduct';
  editProductURL:string=environment.ServerURL+'editProduct';
  getOrderSound:string=environment.ServerURL+'getNotificationStatus';
  updateOrderSound:string=environment.ServerURL+'updateNotificationStatus';



  constructor(private http: HttpClient) {
  }

  fetchAllItems() {
    return this.http.get<productItem>(this.getItemsURL);
  }


  getNewOrderNotificationStatus(){
    return this.http.get<OrderNotificationSoundInterface>(this.getOrderSound);
  }

  updateNotificationSoundStatus(statusObj: OrderNotificationSoundInterface) {
    return this.http.post<OrderNotificationSoundInterface>(this.updateOrderSound, statusObj);
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