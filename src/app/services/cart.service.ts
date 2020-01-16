import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { orderItem } from '../models/orderItem.interface';
import { productItem, productItemOption, productItemAddition } from '../models/product.interface';


@Injectable()
export class CartService {

    order: orderItem[] = [];
    totalOrderPriceEmitter=new Subject<number>();
     totalOrderPrice:number=0;

    constructor() {
    }
  

    triggerCalculationsInCart(allOrderItems: orderItem[]) {
      this.totalOrderPrice=0;
        for (let currentOrderItem of allOrderItems) {
               // Special items are pizza and calzone. THey are dependent upon their size.
        var isItemPizza: boolean = (currentOrderItem.product.productCategory === 'Pizza' || currentOrderItem.product.productCategory === 'Vegatarische_Pizza');
        var isItemCalzone: boolean = (currentOrderItem.product.productCategory === 'Calzone');  
            currentOrderItem.totalPrice = this.calculatePriceOfAProduct(currentOrderItem.product, currentOrderItem.selectedOption, currentOrderItem.listOfAdditions, currentOrderItem.quantity,isItemPizza,isItemCalzone );
            console.log(currentOrderItem.totalPrice);
            this.totalOrderPrice=+Number(this.totalOrderPrice+ currentOrderItem.totalPrice).toFixed(2);
        }
        this.totalOrderPriceEmitter.next(this.totalOrderPrice);
        console.log(this.totalOrderPrice);
    }



    calculatePriceOfAProduct(selectedProduct: productItem, selectedOption: productItemOption, selectedAdditions: productItemAddition[], quantity: number, isItemPizza: boolean, isCalzoneItem: boolean) {
        var additionsCalculation: number = 0;
        var baseCalculation: number = 0;
        if (selectedAdditions != null) {
            for (let currentAddition of selectedAdditions) {
                if (isItemPizza) {
                    switch (selectedOption.productOptionDescription) {
                        case 'klein, Ø26cm:':
                            additionsCalculation = Number(additionsCalculation + (Number(currentAddition.additionsPriceForSmall) * quantity).toFixed(2));
                            break;
                        case 'Groß, Ø30cm:':
                            additionsCalculation = Number(additionsCalculation + (Number(currentAddition.additionsPriceForNormal) * quantity).toFixed(2));
                            break;
                        case 'Familie,46cm x 33cm:':
                            additionsCalculation = Number(additionsCalculation + (Number(currentAddition.additionsPriceForFamily) * quantity).toFixed(2));
                            break;
                        case 'Party,60cm x 40cm:':
                            additionsCalculation = Number(additionsCalculation + (Number(currentAddition.additionsPriceForParty) * quantity).toFixed(2));
                    }
                } else {
                    additionsCalculation = +additionsCalculation + Number(Number(+currentAddition.additionPrice * quantity).toFixed(2));
                }
            }
        }

        if (isItemPizza || isCalzoneItem ) {
            var selectedOptionPrice: number;
            if (selectedOption.optionPriceForSmall) {
                selectedOptionPrice = selectedOption.optionPriceForSmall;
            } else if (selectedOption.optionPriceForNormal) {
                selectedOptionPrice = selectedOption.optionPriceForNormal;
            } else if (selectedOption.optionPriceForFamily) {
                selectedOptionPrice = selectedOption.optionPriceForFamily;
            } else if (selectedOption.optionPriceForParty) {
                selectedOptionPrice = selectedOption.optionPriceForParty;
            }

            baseCalculation = +baseCalculation + +Number(selectedOptionPrice * quantity).toFixed(2);
        } else {
            baseCalculation = +(Number(selectedProduct.productBasePrice) * quantity).toFixed(2);
           
        }
        return +baseCalculation + additionsCalculation;
    }

    /*
   On click of a button first calculate the price of a item and then add it to the array.
    */

    addItemToACart(item: orderItem) {
        var itemFound:boolean=false;
        if (this.order.length < 1) {
            this.order.push(item);
          }
          else{
                for(let existingCurrentItem of this.order){
                     if (existingCurrentItem.product.id === item.product.id) {
                        if (existingCurrentItem.selectedOption === item.selectedOption && this.checkAdditionsInBothOrdersEqual(existingCurrentItem, item)) {
                            existingCurrentItem.quantity = Number(existingCurrentItem.quantity) + Number(item.quantity);
                            itemFound=true;
                          break;
                        }
                      }
                }
                if(!itemFound) {
                    this.order.push(item);
                  }
            } 
            this.triggerCalculationsInCart(this.order);
    }

    checkAdditionsInBothOrdersEqual(existingOrder: orderItem, newOrder: orderItem) {
        
     if(!existingOrder.listOfAdditions || !newOrder.listOfAdditions){
        return true; 
    }
        if ((existingOrder.listOfAdditions.length < 1 && newOrder.listOfAdditions.length < 1)) {
          return true;
        }
    
        if (existingOrder.listOfAdditions.length !== newOrder.listOfAdditions.length) {
          return false;
    
        }
        var matchFound: boolean = false;
    
        if (existingOrder.listOfAdditions.length === newOrder.listOfAdditions.length) {
          for (let currentAdditionInExistingOrder of existingOrder.listOfAdditions) {
    
            for (let currentAdditionInNewOrder of newOrder.listOfAdditions) {
              if (currentAdditionInExistingOrder.id == currentAdditionInNewOrder.id) {
                matchFound = true;
              } else {
                matchFound = false;
              }
            }
            if (!matchFound) {
              return false;
            }
          }
        }
    
        return matchFound;
    
      }


}