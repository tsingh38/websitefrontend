import { PizzaUnit } from './pizzaunit.model';
import { PizzaAdditions } from './pizzaAdditions.model';
import { Product, Additions, Options } from 'src/app/models/product.model';

export class ItemOfOrder{
id:string;
product:Product;
name:string;
selectedOption:Options;
listOfAdditions:Additions[];
quantity:number;
totalPrice:number;


constructor(id:string,product:Product,name:string,selectedOption:Options,listOfAdditions:Additions[],quantity:number,totalprice:number){
this.id=id;
this.product=product;
this.name=name;
this.selectedOption=selectedOption;
this.listOfAdditions=listOfAdditions;
this.quantity=quantity;
this.totalPrice=totalprice;
}
}
