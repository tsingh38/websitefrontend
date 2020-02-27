import { Component, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { orderItem } from 'src/app/models/orderItem.interface';
import { productItem, productItemOption } from 'src/app/models/product.interface';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  orderedItems:orderItem[] = [];
  totalSum:number=0;
  constructor(private cartService: CartService, private router: Router) {
    this.orderedItems=this.cartService.order;
   }

  ngOnInit() {
    this.totalSum=this.cartService.totalOrderPrice;
    this.cartService.totalOrderPriceEmitter.subscribe((params)=>{
      this.totalSum=params.price;
    });
    console.log(this.totalSum);


  }

 /* getItemAdditionsDescription(item:orderItem){
    var description="";
    var counter:number=0;
    var isLastItem:boolean=false;
    if(item.listOfAdditions && item.listOfAdditions.length > 0){
      description="(";
      isLastItem=counter==item.listOfAdditions.length;
      for(let currentAddition of item.listOfAdditions){
        if(counter > 0 && !isLastItem){
          description+=",";
        }
        description+=currentAddition.additionDescription;
        counter++;
      }
      description+=")";
    }
    return description;
  }*/


  ngOnDestroy() {

  }


  decreaseTheQuantity(item: orderItem){
    if(item.quantity > 1){
item.quantity=item.quantity - 1;
this.cartService.triggerCalculationsInCart(this.orderedItems);
}
  }

  increaseTheQuantity(item:orderItem){
    item.quantity=item.quantity + 1;
    this.cartService.triggerCalculationsInCart(this.orderedItems);
  }

  deleteTheItem(index:number){
   this.orderedItems.splice(index,1);
    this.cartService.triggerCalculationsInCart(this.orderedItems);
  }

  getPriceWith2DecimalPlaces(price:Number){
    return parseFloat(price+"").toFixed(2);
  }
  

}
