import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { productItem } from '../models/product.interface';

@Injectable()
export class HttpUtil{

 getItemsURL:string="http://localhost:8080/allitems";

    constructor(private http:HttpClient){
    }

fetchAllItems(){
    return this.http.get<productItem>(this.getItemsURL);
}
    
}