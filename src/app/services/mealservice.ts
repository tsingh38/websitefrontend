import { Injectable } from '@angular/core';
import { Product, Options ,Additions} from '../models/product.model';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';
import { ItemOfOrder } from '../models/itemorder.model';
import { HttpUtil } from './httpUtil.service';
import {map} from 'rxjs/operators';
import { productItem } from '../models/product.interface';



@Injectable()
export class MealService {
    allItems: Product[] = [];
    allProductItems:productItem[]=[];
   productWindowsClosedEmitter=new Subject<{index:number,status:boolean}>();
    constructor(private cartService:CartService,private http:HttpUtil){

    }
    fetchAllItems() {
        //TODO Rest call to fetch all the items 
        this.http.fetchAllItems().pipe(map(responseData =>{
            for(let item in responseData){
               this. allProductItems.push(responseData[item]);
            }
        })).subscribe(params =>{
        })
    }

    submitShortOrder(orderedItem:ItemOfOrder){
        this.cartService.pizzaOrderEmitter.next(orderedItem);
    }

    fetchItemsForActiveUrl(url: string) {
        var filteredItems:Product[]=[];
        for(let currentItem of this.allItems){
            if(currentItem.categoryName=== url){
                filteredItems.push(currentItem);
            }
        }
        return filteredItems;
    }

    calculatePriceOfAProduct(selectedProduct: Product, selectedOption: Options, listOfCheckedPizzaAdditions: Additions[], quantity: number, isPizza:boolean) {
      
        return this.cartService.calculatePriceOfAProduct(selectedProduct,selectedOption,listOfCheckedPizzaAdditions,quantity,isPizza);
    }

    getDummyData(): Product[] {
        var returnItems: Product[]=[];

 var allOptions:Options[]=[];
        var option1=new Options(123,'PizzaS','Pizza Small 28',7.5,false);
       var option2=new Options(124,'PizzaN','Pizza normal 28',9.5,true);
        var option3=new Options(125,'PizzaF','Pizza family 28',11.5,false);
        var option4=new Options(126,'PizzaP','Pizza Party 28',17.5,false);
        allOptions.push(option1);
        allOptions.push(option2);
        allOptions.push(option3);
        allOptions.push(option4);


        var allAdditions:Additions[]=[];
        var Additions1=new Additions(14331,'mit Ananas',1.5,'Bio geschnitten Ananas',1.5,1.5,2,3);
        var Additions2=new Additions(14331,'mit Ingwer',2.5,'Bio geschnitten Ingwer',1.5,1.5,2,3);
        var Additions3=new Additions(14331,'mit knaubloch',2,'Bio geschnitten knaubloch',1.5,1.5,2,3);
        var Additions4=new Additions(14331,'mit Brocolli',1,'Bio geschnitten Brocolli',1.5,1.5,2,3);
        var Additions5=new Additions(14331,'mit oliven',0.5,'Bio geschnitten oliven',1.5,1.5,2,3);

        allAdditions.push(Additions1);
        allAdditions.push(Additions2);
        allAdditions.push(Additions3);
        allAdditions.push(Additions4);
        allAdditions.push(Additions5);

        var product1:Product=new Product(14454,2,'Pizza','Indisch Pizza','Indisch Bio Pizza',9.5,allAdditions,allOptions);
        var product2:Product=new Product(14455,2,'Pizza','Margheritta Pizza','Margheritta Bio Pizza',9.5,allAdditions,allOptions);
        var product3:Product=new Product(14455,2,'Pizza','Ananas Pizza','Ananas Bio Pizza',9.5,allAdditions,allOptions);
        var Additions6=new Additions(14331,'Indische Brot',2.5,'Weiß Pizza brot',1.5,1.5,2,3);
        var allAdditions:Additions[]=[];
        allAdditions.push(Additions6);
        var product4:Product=new Product(14456,3,'Indisch','Bhartha','Bio Auberginne',9.5,allAdditions,[]);
        var product5:Product=new Product(14457,9,'Drink','Cola','Coca Cola enthät caffeine 10mg per 100ml',2.30,[],[]);
        returnItems.push(product1);
        returnItems.push(product2);
        returnItems.push(product3);
        returnItems.push(product4);
        returnItems.push(product5);
        return returnItems;
    }


}