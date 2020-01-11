import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/mealservice';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ItemOfOrder } from 'src/app/models/itemorder.model';
import { DeepcopyUtil } from 'src/app/services/Deepcopy';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  activeUrl:string;
  itemsToDisplay: Product[] = [];
  openMealsByIndex: Boolean[] = [];
  constructor(private mealService:MealService, private route:ActivatedRoute) { 
    this.mealService.fetchAllItems();
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
    this.activeUrl=params['id'];
    this.itemsToDisplay= this.mealService.fetchItemsForActiveUrl(this.activeUrl);
    });
    this.mealService.productWindowsClosedEmitter.subscribe((params)=>{
      var emitStatus={
        index:params.index,
        status:params.status
      };
      this.openMealsByIndex[emitStatus.index] = !emitStatus.status;
    })
  }

  isProductDetailedWindowOpen(index: number): boolean {
    if (this.openMealsByIndex[index] === true) {
      return true;
    }
    return false;
  }


  displayPlusSign(index: number): boolean{
   if(!this.isProductDetailedWindowOpen(index)){
     return true;
   }
   return false;
  }

  openProductDetailWindow(index: number,currentProduct:Product) {
 
    if(currentProduct.productOptions.length < 1 && currentProduct.productAdditions.length < 1){
     var order:ItemOfOrder={  id: '',
     product:null,
     name: '',
     selectedOption : null,
     listOfAdditions: null,
     quantity: 0,
     totalPrice: 0};
     
     order.id = currentProduct.productId+"";
      var localProduct:Product =DeepcopyUtil.deepCopy(currentProduct);
      order.product=localProduct;
      order.name = localProduct.productName;
      order.quantity = 1;
      order.totalPrice = currentProduct.productUnitPrice;
      this.mealService.submitShortOrder(order);

    }else{
      this.openMealsByIndex[index] = true;
    }
  }
  closeProductDetailWindow(index: number) {
    this.openMealsByIndex[index] = false;
  }

  openDetailedWindow(index: number): boolean {
    if (this.openMealsByIndex[index] === true) {
      return true;
    }
    return false;
  }
}
