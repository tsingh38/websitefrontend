import { Injectable } from '@angular/core';
import { HttpUtil } from './httpUtil.service';
import { CustOrderStatus } from '../models/custOrderStatus.interface';
import {map} from 'rxjs/operators';
import { customerOrder } from '../models/customerorder.interface';




@Injectable()
export class ControlPanelService{

    private customerOrders:CustOrderStatus[]=[];
    private interval:number=5000;
    constructor(private http:HttpUtil){

    }

    getAllTheOrders(){
      this.customerOrders=[];
       this.http.fetchAllCustOrders().pipe(map(responseData =>{
         for(let item in responseData){
            this.customerOrders.push(responseData[item]);
         }
     })).subscribe(responseData =>{
       })
   
    return this.customerOrders;

    }


    }
    


