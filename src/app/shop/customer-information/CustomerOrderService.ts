import { CartService } from '../../services/cart.service';
import { Injectable } from '@angular/core';
import { customerOrder } from 'src/app/models/customerorder.interface';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class CustomerOrderService {


    customerOrderAndAddress:customerOrder;
    orderNumberFromServer:number;
    serverError:string;
    orderSubmission=new Subject<{isSuccessful:boolean,orderNumber:number,error:string}>();


    constructor(private cartService: CartService,private httpUtil: HttpUtil) {

    }


    processCustomerOrder(order:customerOrder){
        this.orderNumberFromServer=0;
     this.httpUtil.saveOrder(order).pipe(map(responseData=>{
        this.orderNumberFromServer=responseData;
        if( this.orderNumberFromServer > 0){
            this.cartService.order=[];
            this.cartService.totalOrderPrice=0;
            this.cartService.totalNumberOfItems=0;

        }else{
            throw Observable.throw("Order not saved");  
        }
    })).subscribe(params =>{
        this.orderSubmission.next({isSuccessful:true,orderNumber:this.orderNumberFromServer,error:''});
    },error =>{
        this.serverError=error.error;
        this.orderSubmission.next({isSuccessful:false,orderNumber:0,error:this.serverError});
      },)
    }
    fetchCurrentTimeSlots(): string[] {
        var allTimeSlots: string[] = [];
        var currentDateMilliSeconds=Date.now();
        var dateInMilliSecondsAfterOneHour = +currentDateMilliSeconds + 3600000;
        var dateInMilliSecondsAfterThreeHour = +currentDateMilliSeconds + 10800000;
        var fifteenMinutesInMilliSeconds=900000;
        for (var i = dateInMilliSecondsAfterOneHour; i <= dateInMilliSecondsAfterThreeHour;i=i+900000) {
           var futureHours = new Date(i).getHours();
            var futureMinutes = new Date(i).getMinutes();
            var firstFutureDate ;
            if(Number(futureMinutes)/10 < 1){
               var futureMinutesString='0'+futureMinutes;
                firstFutureDate = futureHours + ":" + futureMinutesString;
            }else{
             firstFutureDate = futureHours + ":" + futureMinutes;
            }
            allTimeSlots.push(firstFutureDate);
            
        }
        return allTimeSlots;

    }

    getCustomerOrder(){
        return this.cartService.order;
    }

    getTotalPriceForCompleteOrder(){
        return this.cartService.totalOrderPrice;
    }

    resetOrderOnceSubmitted(){
        this.cartService.order=[];
       // this.orderNumberFromServer=null;
    }

    fetchCompletedOrderNumber(){
        return this.orderNumberFromServer;
    }

     delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms) );
    }
   
}