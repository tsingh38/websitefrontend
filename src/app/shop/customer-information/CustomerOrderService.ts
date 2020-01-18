import { CartService } from '../../services/cart.service';
import { Injectable } from '@angular/core';
import { customerOrder } from 'src/app/models/customerorder.interface';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class CustomerOrderService {


    customerOrderAndAddress:customerOrder;
    orderNumberFromServer:number;
    serverError:string;

    constructor(private cartService: CartService,private httpUtil: HttpUtil) {

    }


    processCustomerOrder(order:customerOrder){
     this.httpUtil.saveOrder(order).pipe(map(responseData=>{
        this.orderNumberFromServer=responseData;
        console.log( this.orderNumberFromServer);
    })).subscribe(params =>{
    })
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
    fetchCompletedOrderNumber(){
        //TODO Rest aufruf
        console.log("fetching order number"+this.orderNumberFromServer);
        return this.orderNumberFromServer;
    }

     delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms) );
    }
   
}