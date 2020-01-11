import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PizzaAdditions } from '../../models/pizzaAdditions.model';
import { PizzaUnit } from '../../models/pizzaunit.model';
import { ItemOfOrder } from '../../models/itemorder.model';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  orderedItems: ItemOfOrder[] = [];
  showEmptyShoppingCart: boolean = this.orderedItems.length <= 1;
  totalSum = 0;
  deliveryCharges = 2;
  OrderSum = 0;
  orderCannotBeDelivered = false;
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {

    this.cartService.pizzaOrderEmitter.subscribe(params => {
      var recievedItem: ItemOfOrder;
      if (params) {
        recievedItem = new ItemOfOrder(params.id, params.product, params.name, params.selectedOption, params.listOfAdditions, params.quantity, params.totalPrice);
        this.addItemToOrder(recievedItem);
      } else {
        this.orderedItems = [];
      }
      this.triggerPriceCalculation();
    });

    this.cartService.priceCalculationEmitter.subscribe((params => {
      this.triggerPriceCalculation();
    }));
  }

  ngOnDestroy() {
    this.cartService.pizzaOrderEmitter.unsubscribe();
  }
  triggerPriceCalculation() {
    this.cartService.triggerCalculationsInCart(this.orderedItems);
    this.totalSum = 0;
    for (let currentItemInOrder of this.orderedItems) {
      this.totalSum = Number(this.totalSum) + Number(currentItemInOrder.totalPrice);
    }
    this.orderCannotBeDelivered = this.totalSum < 15 ? true : false;
    if (this.orderCannotBeDelivered) {
      this.OrderSum = this.totalSum;
    } else {
      this.OrderSum = this.totalSum + this.deliveryCharges;
    }
  }
  checkAdditionsInBothOrdersEqual(existingOrder: ItemOfOrder, newOrder: ItemOfOrder) {

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
          if (currentAdditionInExistingOrder.additionsId == currentAdditionInNewOrder.additionsId) {
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


  submitOrder() {
    this.cartService.order = this.orderedItems;
    this.router.navigate(['/customer']);

  }

  addItemToOrder(order: ItemOfOrder) {

    if (this.orderedItems.length < 1) {
      this.orderedItems.push(order);
    }
    else {
      for (let currentExistingOrder of this.orderedItems) {
        if (currentExistingOrder.id !== order.id) {
          this.orderedItems.push(order);
          break;
        }
        else if (currentExistingOrder.id === order.id) {
          if (currentExistingOrder.selectedOption === order.selectedOption && this.checkAdditionsInBothOrdersEqual(currentExistingOrder, order)) {
            currentExistingOrder.quantity = Number(currentExistingOrder.quantity) + Number(order.quantity);
            currentExistingOrder.totalPrice = Number(currentExistingOrder.totalPrice) + Number(order.totalPrice);
            break;
          }
          else {
            this.orderedItems.push(order);
            break;
          }
        }
      }
    }
  }


  getOderAdditionsText(indexx: string): String {
    var existAdditionsInItem: boolean = this.orderedItems[indexx].listOfAdditions > 0;
if( this.orderedItems[indexx].listOfAdditions===null){
  return "";
}
    var orderItemText: string = existAdditionsInItem ? "mit(" : "";
    for (let pizzaAddition of this.orderedItems[indexx].listOfAdditions) {
      orderItemText += " " + pizzaAddition.additionsName;
    }
    orderItemText += existAdditionsInItem ? ")" : "";

    return orderItemText;
  }


  getProductDescription(item:Product){
    
  }

  increaseQuantity(orderItem: ItemOfOrder) {
    orderItem.quantity = +orderItem.quantity + 1;
    orderItem.totalPrice = Number((+orderItem.totalPrice * 2).toFixed(2));
    this.cartService.priceCalculationEmitter.next(orderItem);
  }
  decreaseQuantity(orderItem: ItemOfOrder) {
    if (orderItem.quantity > 1) {
      orderItem.quantity = +orderItem.quantity - 1;
      orderItem.totalPrice = Number((+orderItem.totalPrice / 2).toFixed(2));
    }
    this.cartService.priceCalculationEmitter.next(orderItem);
  }
  deleteTheItemFromOrder(orderItem: ItemOfOrder) {
    this.orderedItems.splice(this.orderedItems.indexOf(orderItem), 1);
    this.cartService.priceCalculationEmitter.next(orderItem);


  }



}
