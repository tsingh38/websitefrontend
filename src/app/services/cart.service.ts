import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PizzaAdditions } from '../models/pizzaAdditions.model';
import { ItemOfOrder } from '../models/itemorder.model';
import { Product, Options, Additions } from 'src/app/models/product.model';


@Injectable() 
export class CartService{

    pizzaOrderEmitter=new Subject<ItemOfOrder>();
    priceCalculationEmitter=new Subject<ItemOfOrder>();
    order:ItemOfOrder[]=[];

constructor(){

 }


 triggerCalculationsInCart(allOrderItems:ItemOfOrder[] ){
     
for(let currentOrderItem of allOrderItems){
    currentOrderItem.totalPrice= this.calculatePriceOfAProduct(currentOrderItem.product,currentOrderItem.selectedOption,currentOrderItem.listOfAdditions,currentOrderItem.quantity,currentOrderItem.product.categoryName==='Pizza');
    }
}
 


 calculatePriceOfAProduct(selectedProduct:Product,selectedOption:Options,selectedAdditions:Additions[],quantity:number,isProductAPizza:boolean){
var additionsCalculation:number=0;
var baseCalculation:number=0;
if(selectedAdditions!=null){
for(let currentAddition of selectedAdditions){
    if(isProductAPizza){
        switch(selectedOption.optionName){
            case 'PizzaS': additionsCalculation=+additionsCalculation+Number(Number(currentAddition.additionPriceS*quantity).toFixed(2));
            break;
            case 'PizzaN':additionsCalculation=+additionsCalculation+Number(Number(currentAddition.additionPriceN*quantity).toFixed(2));
            break;
            case 'PizzaF': additionsCalculation=+additionsCalculation+Number(Number(currentAddition.additionPriceF*quantity).toFixed(2));
            break;
            case 'PizzaP': additionsCalculation=+additionsCalculation+Number(Number(currentAddition.additionPriceP*quantity).toFixed(2));
        }
    }else{
        additionsCalculation=+additionsCalculation+Number(Number(currentAddition.additionsPrice*quantity).toFixed(2));
    }
}
}

if(isProductAPizza){
    console.log(Number(Number(selectedOption.optionDefaultPrice*quantity).toFixed(2)));
    baseCalculation=+baseCalculation+Number(Number(selectedOption.optionDefaultPrice*quantity).toFixed(2));
    console.log(baseCalculation);
}else{
    baseCalculation=+(selectedProduct.productUnitPrice*quantity).toFixed(2);
    if(selectedOption!=null){
    baseCalculation+=+(selectedOption.optionDefaultPrice*quantity).toFixed(2);
    }
}
return +baseCalculation+additionsCalculation;
 }

//do we need the following anymore ?

 /*calculateTotalPriceForAUnit(selectedProduct: Product, selectedPizzaSize: String, listOfCheckedPizzaAdditions: PizzaAdditions[], quantity: Number) {
    var calculatedPrice:Number = 0;
    switch (selectedPizzaSize) {
        case 'Small 26': calculatedPrice = selectedPizza.pizzaPriceS;
            break;
        case 'Normal 28': calculatedPrice = selectedPizza.pizzaPriceN;
            break;
        case 'Family 32': calculatedPrice = selectedPizza.pizzaPriceF;
            break;
        case 'Party 38': calculatedPrice = selectedPizza.pizzaPriceP;
            break;
    }
    calculatedPrice = Number(calculatedPrice) * Number(quantity);

    var pizzaBaseAdditionPrice = 0;
    for (let currentPizzaAddition of listOfCheckedPizzaAdditions) {
        switch (selectedPizzaSize) {
            case 'Small 26': pizzaBaseAdditionPrice = pizzaBaseAdditionPrice + +Number(Number(currentPizzaAddition.priceS) * Number(quantity)).toFixed(2);
                break;
            case 'Normal 28': pizzaBaseAdditionPrice = pizzaBaseAdditionPrice + +Number(Number(currentPizzaAddition.priceN) * Number(quantity)).toFixed(2);
                break;
            case 'Family 32': pizzaBaseAdditionPrice = pizzaBaseAdditionPrice + +Number(Number(currentPizzaAddition.priceF) * Number(quantity)).toFixed(2);
                break;
            case 'Party 38': pizzaBaseAdditionPrice = pizzaBaseAdditionPrice + +Number(Number(currentPizzaAddition.priceP) * Number(quantity)).toFixed(2);
                break;
        }
    }
    calculatedPrice = +calculatedPrice + pizzaBaseAdditionPrice;

    return calculatedPrice;
}*/


isOrderSelected():boolean{
if(this.order==null || this.order.length < 1){
    return false;
}
return true;
}
 
}