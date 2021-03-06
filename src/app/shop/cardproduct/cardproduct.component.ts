import { Component, OnInit, Input, ViewChild, ViewChildren,QueryList,ElementRef, Renderer, Renderer2 } from '@angular/core';
import { productItem, productItemAddition, productItemOption } from 'src/app/models/product.interface';
import { orderItem } from 'src/app/models/orderItem.interface';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ShopUtil } from 'src/app/services/ShopUtil';

@Component({
  selector: 'app-cardproduct',
  templateUrl: './cardproduct.component.html',
  styleUrls: ['./cardproduct.component.scss']
})
export class CardproductComponent implements OnInit {

  @Input('product') product: productItem;
  @ViewChildren('select') selectReference:QueryList<ElementRef>;
  show = 3;
  listOfCheckedProductAdditions: productItemAddition[] = [];
  selectedOption: productItemOption;
  quantity:number=1;
  productDisplayPrice:string='0';
  totalPriceInShoppingCart:number;
  constructor(private cartService:CartService,private render:Renderer2,private router:Router) { }

  ngOnInit() {
    // Setting the default selected value
    for (let currentProductOption of this.product.productOptions) {
      if (!this.selectedOption && currentProductOption.default) {
             this.selectedOption = currentProductOption;
      }
    }
    if(this.product.productCategory==='Pizza' || this.product.productCategory==='Vegatarische_Pizza'  || this.product.productCategory==='Calzone'){
      for(let currentOption of this.product.productOptions){
        if(currentOption.default){
         this.productDisplayPrice= ShopUtil.getNumberWith2DecimalPlaces(this.getPriceFromSelectedOption(currentOption));
        }
      }
    }else{
      this.productDisplayPrice= ShopUtil.getNumberWith2DecimalPlaces(this.product.productBasePrice);
    }


  }


  selectDefaultValue($productOptions:productItemOption){
return $productOptions.default;
  }

  increaseTheQuantity(){
this.quantity=+this.quantity+1;
  }

  decreaseTheQuantity(){
if(this.quantity>1){
  this.quantity=+this.quantity-1;
}
  }

  fetchPriceForSelectedAddition(productAddition: productItemAddition, event: Event) {
    if ((<HTMLInputElement>event.target).checked) {
      this.listOfCheckedProductAdditions.push(productAddition);
    } else if (!(<HTMLInputElement>event.target).checked) {
      if (this.listOfCheckedProductAdditions.length > 0) {
        for (let existingProductAddition of this.listOfCheckedProductAdditions) {
          if (existingProductAddition.id === productAddition.id) {
            this.listOfCheckedProductAdditions.splice(this.listOfCheckedProductAdditions.indexOf(productAddition), 1);
          }
        }
      }
    }
  }


  hasProductOptions() {
    return this.product.productOptions && this.product.productOptions.length > 0 ? true : false;
  }

  hasProductAdditions() {
    return this.product.productAdditions && this.product.productAdditions.length > 0 ? true : false;
  }

  getProductDetailedDescription() {
    return this.product.optionDescription;
  }

  displayProductAdditionPriceForSelectedOption(productAddition: productItemAddition) {
    if (this.selectedOption && (this.product.productCategory === 'Pizza' || this.product.productCategory === 'Calzone' || this.product.productCategory === 'Vegatarische_Pizza')) {
      if (this.selectedOption.optionPriceForFamily) {
        return ShopUtil.getNumberWith2DecimalPlaces(productAddition.additionsPriceForFamily);
      }
      if (this.selectedOption.optionPriceForNormal) {
        return ShopUtil.getNumberWith2DecimalPlaces(productAddition.additionsPriceForNormal);
      }
      if (this.selectedOption.optionPriceForParty) {
        return ShopUtil.getNumberWith2DecimalPlaces(productAddition.additionsPriceForParty);
      }
      if (this.selectedOption.optionPriceForSmall) {
        return ShopUtil.getNumberWith2DecimalPlaces(productAddition.additionsPriceForSmall);
      }
    } else {
      return ShopUtil.getNumberWith2DecimalPlaces(productAddition.additionPrice);
    }
  }


  setUserSelectedOption($event: Event) {
    var selectedOption: string = (<HTMLTextAreaElement>$event.target).value;
    for (let currentOption of this.product.productOptions) {
      if (selectedOption && currentOption.id === +selectedOption) {
        this.selectedOption = currentOption;
        this.productDisplayPrice=ShopUtil.getNumberWith2DecimalPlaces(this.getPriceFromSelectedOption( this.selectedOption));
      }
    }
  }

  getPriceFromSelectedOption($option:productItemOption){
    if($option.optionPriceForSmall){
      return $option.optionPriceForSmall;
    }
    else if($option.optionPriceForNormal){
      return $option.optionPriceForNormal;
    }
   else  if($option.optionPriceForFamily){
      return $option.optionPriceForFamily;
    }
    else if($option.optionPriceForParty){
      return $option.optionPriceForParty;
    }
    else{
      return this.product.productBasePrice;
    }

  }
  getProductPrice() {
    if (this.product.productCategory && (this.product.productCategory === 'Pizza' || this.product.productCategory === 'Vegatarische_Pizza' || this.product.productCategory === 'Calzone')) {
      if (this.product.productOptions) {
        for (let currentProduct of this.product.productOptions) {
          if (currentProduct.optionPriceForNormal) {
            return ShopUtil.getNumberWith2DecimalPlaces(currentProduct.optionPriceForNormal);
          }
        }
      }
    } else {
      return ShopUtil.getNumberWith2DecimalPlaces(this.product.productBasePrice);
    }

  }



  resetAProduct(){
    this.listOfCheckedProductAdditions=[];
    for(let currentelRef of this.selectReference.toArray()){
      this.render.setProperty(currentelRef.nativeElement,'checked',false);
    }
    this.quantity=1;
    for (let currentProductOption of this.product.productOptions) {
      if (!this.selectedOption && currentProductOption.default) {
             this.selectedOption = currentProductOption;
      }
    }
    if(this.product.productCategory==='Pizza' || this.product.productCategory==='Vegatarische_Pizza'  || this.product.productCategory==='Calzone'){
      for(let currentOption of this.product.productOptions){
        if(currentOption.default){
         this.productDisplayPrice= ShopUtil.getNumberWith2DecimalPlaces(this.getPriceFromSelectedOption(currentOption));
        }
      }
    }else{
      this.productDisplayPrice=ShopUtil.getNumberWith2DecimalPlaces(this.product.productBasePrice);
    }
  }
  submitProductToACart(){
    var selectedOptionId=0;
    if(this.selectedOption){
       selectedOptionId=this.selectedOption.id;
      }
    var currentItem: orderItem={
      product:this.product,
    selectedOption:this.selectedOption,
    selectedOptionStr:'',
    listOfAdditions:this.listOfCheckedProductAdditions,
    quantity:this.quantity,
    totalPrice:0,
    selectedOptionId:selectedOptionId
    }
    if(this.selectedOption){
      currentItem.selectedOptionStr=this.selectedOption.productOptionDescription;
    }
    this.cartService.addItemToACart(currentItem);
    this.resetAProduct();


  }

  submitOrder(){
    this.router.navigate(['/cart']);
  }


}
