import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TestBed } from '@angular/core/testing';
import { CatalogService } from 'src/app/services/catalogservice';
import { productItem, productItemOption, productItemAddition } from 'src/app/models/product.interface';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  selectedCategory: string;
  articleDescription: string;
  articleDetailDescription: string;
  isCategoryPizza: boolean;
  productBasePrice: number;
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
  option2CalzonePrice: number;
  hasProductOptions: string;
  hasProductAdditions: string;
  optionsOfProductArray: string[] = [];
  additionsOfProductArray: Array<NewProductAddition> = [];


  categories: string[] = ["Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta", "Pasta_al_Forno", "Indische_Gerichte",
    "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
    "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]
  constructor(private catalogService: CatalogService) {

  }

  ngOnInit() {
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  executeOptionChangeInDropDown($event: Event) {
    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    if (selectedCategory === 'Ja') {
      this.optionsOfProductArray.push("");
    }
  }


  executeAdditionChangeInDropDown($event: Event) {
    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    if (selectedCategory === 'Ja') {
      this.additionsOfProductArray.push(new NewProductAddition());
    }
  }


  increaseTheOptionNumber() {
    this.optionsOfProductArray.push("");
  }

  increaseTheAdditionNumber() {
    this.additionsOfProductArray.unshift(new NewProductAddition());
  }

  /*
  Save the new Product

  */

  getPizzaOptionsPrice(): productItemOption[] {
    let allPizzaOptions:productItemOption[]=[];
    let productOption1: productItemOption = {} as any;
    let productOption2: productItemOption = {} as any;
    let productOption3: productItemOption = {} as any;
    let productOption4: productItemOption = {} as any;
    productOption1.productOptionDescription=this.option1PizzaDescription;
    productOption1.optionPriceForSmall=this.option1PizzaPrice;
    productOption2.productOptionDescription=this.option2PizzaDescription;
    productOption2.optionPriceForNormal =this.option2PizzaPrice;
    productOption2.default=true;
    productOption3.productOptionDescription=this.option3PizzaDescription;
    productOption3.optionPriceForFamily=this.option3PizzaPrice;
    productOption4.productOptionDescription=this.option4PizzaDescription;
    productOption4.optionPriceForParty=this.option4PizzaPrice;
      allPizzaOptions.push(productOption1);
      allPizzaOptions.push(productOption2);
      allPizzaOptions.push(productOption3);
      allPizzaOptions.push(productOption4);
    return allPizzaOptions;
  }

  getCalzoneOptionsWithPrice(): productItemOption[] {
    let allCalzoneOptions:productItemOption[]=[];
    let calzoneOption1: productItemOption = {} as any;
    let calzoneOption2: productItemOption = {} as any;
    calzoneOption1.productOptionDescription=this.option1CalzoneDescription;
    calzoneOption1.optionPriceForSmall=this.option1CalzonePrice;
    calzoneOption2.productOptionDescription=this.option2CalzoneDescription;
    calzoneOption2.optionPriceForSmall=this.option2CalzonePrice;
    allCalzoneOptions.push(calzoneOption1);
    allCalzoneOptions.push(calzoneOption2);
    return allCalzoneOptions;
  }

  getProductOptions(): productItemOption[] {
    let allProductOptions:productItemOption[]=[];
   for(let i=0; i<this.optionsOfProductArray.length; i++){
      let currentProductOptions:productItemOption={} as any; 
      currentProductOptions.optionPrice=0;
      currentProductOptions.productOptionDescription=this.optionsOfProductArray[i];  
      allProductOptions.push(currentProductOptions);
}

    return allProductOptions;
  }

  getProductAdditions(): productItemAddition[] {
    let allProductAdditions:productItemAddition[]=[];
    for(let i=0; i<this.additionsOfProductArray.length; i++){
       let currentProductAddition:productItemAddition={} as any; 
       currentProductAddition.additionPrice =this.additionsOfProductArray[i].additionPrice;
       currentProductAddition.additionDescription =this.additionsOfProductArray[i].additionDescription;  
       allProductAdditions.push(currentProductAddition);
 }
 
     return allProductAdditions;
  }
  processNewProduct() {
    let product: productItem = {} as any;
    product.description = this.articleDescription;
    product.productCategory = this.selectedCategory;
    product.optionDescription = this.articleDetailDescription;
    product.productBasePrice = this.productBasePrice;

    if (this.hasProductOptions === 'Nein' && this.hasProductAdditions === 'Nein') {
      product.productAdditions = [];
      product.productOptions = [];
    } else if (this.selectedCategory === "Pizza" || this.selectedCategory === "Vegatarische_Pizza") {
      product.productBasePrice = null;
      product.productOptions = this.getPizzaOptionsPrice();
      product.productAdditions = [];
      // Pizza Additions will added on server itself
    } else if (this.selectedCategory === "Calzone") {
      product.productBasePrice = null;
      product.productOptions = this.getCalzoneOptionsWithPrice();
      product.productAdditions = [];
    }
    else {
      product.productOptions = this.getProductOptions();
      product.productAdditions = this.getProductAdditions();
    }
    // Post Aufruf
    this.catalogService.addNewProduct(product).subscribe(()=>{
      // In success Fall what to do 
    },error=>{
     // in error Fall what to do 
    })
  }
}



class NewProductAddition {

  additionDescription: string;
  additionPrice: number;

}
