import { Component, OnInit, Input, ViewChild, ViewChildren,QueryList,ElementRef, Renderer, Renderer2 } from '@angular/core';
import { productItem, productItemAddition, productItemOption } from 'src/app/models/product.interface';
import { orderItem } from 'src/app/models/orderItem.interface';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

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
  productDisplayPrice:number=0;
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
         this.productDisplayPrice= this.getPriceFromSelectedOption(currentOption);
        }
      }
    }else{
      this.productDisplayPrice=this.product.productBasePrice;
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

  hasProductAdditions($product: productItem) {
    return this.product.productAdditions && this.product.productAdditions.length > 0 ? true : false;
  }

  getProductDetailedDescription() {
    return this.product.optionDescription;
  }

  displayProductAdditionPriceForSelectedOption(productAddition: productItemAddition) {
    if (this.selectedOption && (this.product.productCategory === 'Pizza' || this.product.productCategory === 'Calzone' || this.product.productCategory === 'Vegatarische_Pizza')) {
      if (this.selectedOption.optionPriceForFamily) {
        return productAddition.additionsPriceForFamily;
      }
      if (this.selectedOption.optionPriceForNormal) {
        return productAddition.additionsPriceForNormal;
      }
      if (this.selectedOption.optionPriceForParty) {
        return productAddition.additionsPriceForParty;
      }
      if (this.selectedOption.optionPriceForSmall) {
        return productAddition.additionsPriceForSmall;
      }
    } else {
      return productAddition.additionPrice;
    }
  }


  setUserSelectedOption($event: Event) {
    var selectedOption: string = (<HTMLTextAreaElement>$event.target).value;
    for (let currentOption of this.product.productOptions) {
      if (selectedOption && currentOption.id === +selectedOption) {
        this.selectedOption = currentOption;
        this.productDisplayPrice=this.getPriceFromSelectedOption( this.selectedOption);
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
            return currentProduct.optionPriceForNormal;
          }
        }
      }
    } else {
      return this.product.productBasePrice;
    }

  }
  

  resetAProduct(){
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
         this.productDisplayPrice= this.getPriceFromSelectedOption(currentOption);
        }
      }
    }else{
      this.productDisplayPrice=this.product.productBasePrice;
    }
  }
  submitProductToACart(){
  
    var currentItem: orderItem={
      product:this.product,
    selectedOption:this.selectedOption,
    listOfAdditions:this.listOfCheckedProductAdditions= [],
    quantity:this.quantity,
    totalPrice:0
    }
    this.cartService.addItemToACart(currentItem);
    this.resetAProduct();


  }

  submitOrder(){
    this.router.navigate(['/cart']);
  }


}
