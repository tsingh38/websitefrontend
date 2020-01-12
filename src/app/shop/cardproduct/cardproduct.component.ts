import { Component, OnInit, Input } from '@angular/core';
import { productItem,productItemAddition ,productItemOption} from 'src/app/models/product.interface';

@Component({
  selector: 'app-cardproduct',
  templateUrl: './cardproduct.component.html',
  styleUrls: ['./cardproduct.component.scss']
})
export class CardproductComponent implements OnInit {

  @Input('product') product:productItem;
  show = 3;
  listOfCheckedProductAdditions: productItemAddition[] = [];
  selectedOption:productItemOption;
  constructor() { }

  ngOnInit() {
    console.log(this.product);
  }

  fetchPriceForSelectedAddition(productAddition:productItemAddition,event:Event){
    if ((<HTMLInputElement>event.target).checked) {
      this.listOfCheckedProductAdditions.push(productAddition);
    }
  }


  hasProductOptions(){
    return this.product.productOptions && this.product.productOptions.length > 0 ?true:false;
      }
    
      hasProductAdditions($product:productItem){
        return this.product.productAdditions && this.product.productAdditions.length > 0 ?true:false;
      }
    
      getProductDetailedDescription(){
        return this.product.optionDescription;
      }

      displayProductAdditionPriceForSelectedOption(productAddition:productItemAddition){
        //TODO
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
  /*
  fetchPriceForSelectedAddition_TODODELETE(productAddition:productItemAddition, event: Event) {

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
  }*/


}
