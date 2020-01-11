import { Component, OnInit, Input } from '@angular/core';
import { Product, Options, Additions } from 'src/app/models/product.model';
import { PizzaAdditions } from '../../../models/pizzaAdditions.model';
import { CartService } from '../../../services/cart.service';
import { MealService } from '../../../services/mealservice';
import {ItemOfOrder } from '../../../models/itemorder.model';
import { DeepcopyUtil } from '../../../services/Deepcopy';

@Component({
  selector: 'app-detail-window',
  templateUrl: './detail-window.component.html',
  styleUrls: ['./detail-window.component.scss']
})
export class DetailWindowComponent implements OnInit {
  @Input('product') product: Product;
  @Input('indexOfProduct')indexOfProduct:number;
  selectedOption:Options;

  allProductOptions: Options [] = [];
  isSelectedProductAPizza:boolean=false;
  selectedQuantity: number = 1;
  priceOnButton: number = 0;
  show = 3;
  closeThisWindow=false;
  listOfCheckedProductAdditions: Additions[] = [];
  
  orderedItem:ItemOfOrder= {
    id: '',
    product:null,
    name: '',
    selectedOption : null,
    listOfAdditions: null,
    quantity: 0,
    totalPrice: 0
  }

  constructor(private cartService:CartService,private mealService:MealService) { }

  ngOnInit() {
    this.allProductOptions=this.product.productOptions;
    this.isSelectedProductAPizza=this.product.categoryName==='Pizza';
    this.selectedOption=this.getDefaultOption();
  }


  displayOptions(){
    return this.product.productOptions.length  > 0;
  }


  displayAdditions(){
 return this.product.productAdditions.length > 0;
  }

  ngDoCheck() {
    this.priceOnButton = this.cartService.calculatePriceOfAProduct(this.product, this.selectedOption, this.listOfCheckedProductAdditions, this.selectedQuantity,this.isSelectedProductAPizza);
 console.log("price on button" + this.priceOnButton);
  }


  productOptionSelected(event: Event) {  
   var selectedValue:string=(<HTMLTextAreaElement>event.target).value;
  for(let currentOption of this.product.productOptions){
    if(currentOption.optionName===selectedValue){
      this.selectedOption=new Options(currentOption.optionId,currentOption.optionName,currentOption.optionDescription,currentOption.optionDefaultPrice,currentOption.isDefault);
    }
  }
  
  }


  
  priceOnButtonToShow():number{
    if(this.priceOnButton ===0 ){
return this.product.productUnitPrice;
    }return this.priceOnButton;
  }

  increaseTheNumber(): Number {
    this.selectedQuantity = Number(this.selectedQuantity) + 1;
    return this.selectedQuantity;
  }
  decreaseTheNumber(): Number {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity = Number(this.selectedQuantity) - 1;
    }
    return this.selectedQuantity;
  }

  displayProductAdditionPriceForSelectedOption(currentProductAddition: Additions) {
    if(!this.selectedOption){
      return currentProductAddition.additionsPrice;
    }
  if( this.product.categoryName==='Pizza'){
       switch(this.selectedOption.optionName){
        case 'PizzaS':return currentProductAddition.additionPriceS;
        case 'PizzaN':return currentProductAddition.additionPriceN;
        case 'PizzaF':return currentProductAddition.additionPriceF;
        case 'PizzaP':return currentProductAddition.additionPriceP;
       }
     }else{
       return currentProductAddition.additionsPrice;
     }
    
    return 0;
  }

  onSubmit(index: number) {
    this.orderedItem.id = this.product.productId+"";
    var localProduct:Product =DeepcopyUtil.deepCopy(this.product);
    this.orderedItem.product=localProduct;
    this.orderedItem.name = localProduct.productName;
    this.orderedItem.quantity = this.selectedQuantity;
    if(this.selectedOption){
    this.orderedItem.selectedOption = this.selectedOption;
    }
    var  locallistOfProductAdditions:Additions[]  =DeepcopyUtil.deepCopy(this.listOfCheckedProductAdditions);
    this.orderedItem.listOfAdditions = locallistOfProductAdditions;
    this.orderedItem.totalPrice = this.priceOnButton;
    this.cartService.pizzaOrderEmitter.next( this.orderedItem);
    var emitStatus={
      index:this.indexOfProduct,
      status:true
    }
    this.mealService.productWindowsClosedEmitter.next(emitStatus);
   

  }
  fetchPriceForSelectedAddition(productAddition:Additions, event: Event) {

    console.log("fetchPriceForSelectedAddition ->"+productAddition);
    if ((<HTMLInputElement>event.target).checked) {
      this.listOfCheckedProductAdditions.push(productAddition);
    }
    else if (!(<HTMLInputElement>event.target).checked) {
      if (this.listOfCheckedProductAdditions.length > 0) {
        for (let existingProductAddition of this.listOfCheckedProductAdditions) {
          if (existingProductAddition.additionsId === productAddition.additionsId) {
            this.listOfCheckedProductAdditions.splice(this.listOfCheckedProductAdditions.indexOf(productAddition), 1);
          }
        }
      }
    }
  }

  getDefaultOption(){
    for(let currentOption of this.product.productOptions){
      if(currentOption.isDefault){
       return currentOption;
      }
    }
  }

}
