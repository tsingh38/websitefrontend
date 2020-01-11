import { CartService } from '../../services/cart.service';
import { Injectable } from '@angular/core';
import { customerInformationAndOrderModel } from '../../models/customerInformation.model';

@Injectable()
export class CustomerInformationService {


    customerOrderAndAddress:customerInformationAndOrderModel;

    constructor(private cartService: CartService) {

    }


    processCustomerOrder(order:customerInformationAndOrderModel){
        //TODO Rest Aufruf
        this.customerOrderAndAddress=order;
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
        return '1459685';
    }


}