import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';
import { HttpUtil } from './httpUtil.service';
import {map} from 'rxjs/operators';
import { productItem } from '../models/product.interface';



@Injectable()
export class MealService {
    allProductItems:productItem[]=[];
   productWindowsClosedEmitter=new Subject<{index:number,status:boolean}>();
    constructor(private cartService:CartService,private http:HttpUtil){

    }
    fetchAllItems() {
        this.http.fetchAllItems().pipe(map(responseData =>{
            for(let item in responseData){
                const currentItem:productItem=responseData[item];
               this.allProductItems.push(currentItem);
            }
        })).subscribe(params =>{
        })
        return this.allProductItems;
    }

 




}