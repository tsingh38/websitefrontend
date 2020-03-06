import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';
import { HttpUtil } from './httpUtil.service';
import {map} from 'rxjs/operators';
import { productItem } from '../models/product.interface';



@Injectable()
export class CatalogService {

    constructor(private http:HttpUtil){

    }


    deleteProduct(product:productItem){
       return  this.http.deleteProduct(product);
    }

    addNewProduct(product:productItem){
        return this.http.addProduct(product);
    }

 




}