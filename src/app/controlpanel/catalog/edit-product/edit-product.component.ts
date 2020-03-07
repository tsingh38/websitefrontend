import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { productItem } from 'src/app/models/product.interface';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input('product') product: productItem;
  productCategory:string;
  option1PizzaDescription: string = "klein, Ø26cm:'";
  option1PizzaPrice: number;
  option2PizzaDescription: string = "Groß, Ø30cm:";
  option2PizzaPrice: number;
  option3PizzaDescription: string = "Familie,46cm x 33cm:";
  option3PizzaPrice: number;
  option4PizzaDescription: string = "Party,60cm x 40cm:";
  option4PizzaPrice: number;
  option1CalzoneDescription: string = "klein, Ø26cm:";
  option1CalzonePrice: number;
  option2CalzoneDescription: string = "Groß, Ø30cm:";
  option2CalzonePrice:number;
  @Output()close=new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
    this.productCategory=this.product.productCategory;
    if(this.productCategory==='Pizza' || this.productCategory==='Vegatarische_Pizza'){
      for(var productItemOption of this.product.productOptions){
        if(productItemOption.productOptionDescription==='klein, Ø26cm:'){
          this.option1PizzaDescription=productItemOption.productOptionDescription;
          this.option1PizzaPrice=productItemOption.optionPriceForSmall;
        }
        if(productItemOption.productOptionDescription==='Groß, Ø30cm:'){
          this.option2PizzaDescription=productItemOption.productOptionDescription;
          this.option2PizzaPrice=productItemOption.optionPriceForNormal;
        }
        if(productItemOption.productOptionDescription==='Familie,46cm x 33cm:'){
          this.option3PizzaDescription=productItemOption.productOptionDescription;
          this.option3PizzaPrice=productItemOption.optionPriceForFamily;
        }
        if(productItemOption.productOptionDescription==='Party,60cm x 40cm:'){
          this.option4PizzaDescription=productItemOption.productOptionDescription;
          this.option4PizzaPrice=productItemOption.optionPriceForParty;
        }
      }
    }
    if(this.productCategory==='Calzone'){
      for(var productItemOption of this.product.productOptions){
        if(productItemOption.productOptionDescription==='klein, Ø26cm:'){
          this.option1CalzoneDescription=productItemOption.productOptionDescription;
          this.option1CalzonePrice=productItemOption.optionPriceForSmall;
        }
        if(productItemOption.productOptionDescription==='Groß, Ø30cm:'){
          this.option1CalzoneDescription=productItemOption.productOptionDescription;
          this.option2CalzonePrice=productItemOption.optionPriceForNormal;
        }
      }
    }
  }

  onClose(){
    this.close.emit();
    this.product.productAdditions.length
  }
  cancel(){
    this.onClose();
  }

}
