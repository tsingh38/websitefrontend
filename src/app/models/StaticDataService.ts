import { Injectable } from '@angular/core';

@Injectable()
export class StaticDataService{

    private  ordersViewCategory:string[]=['Alle','Von Heute','Bearbeitet','Unbearbeitet','Von dieser Woche'];


    getOrdersViewCategory(){
        return this.ordersViewCategory;
    }

    getIntervalTimeBetweenTheGetOrderRequests(){
        return 20000;
    }
}