import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  selectedCategory:string;
  articleDescription:string;
  isCategoryPizza:boolean;
  option1PizzaDescription:string="klein, Ø26cm:'";
  option2PizzaDescription:string="Groß, Ø30cm:";
  option3PizzaDescription:string="Familie,46cm x 33cm:";
  option4PizzaDescription:string="Party,60cm x 40cm:";
  option1CalzoneDescription:string="klein, Ø26cm:";
  option2CalzoneDescription:string="Groß, Ø30cm:";
  hasProductOptions:string;
  numberOfTimesOption=1;
  numberOfTimesAdditions=1;
  numberOfTimesAdditionArray=[...Array(this.numberOfTimesAdditions).keys()];
  numberOfTimesOptionArray= [...Array(this.numberOfTimesOption).keys()] ;
  additionsOfPrductArray=[...Array(this.numberOfTimesAdditions).keys()];
  optionsOfProductArray=[...Array(this.numberOfTimesOption).keys()];
  additionsOfProductArray: Array<NewProductAddition>=[];


  categories: string[] = ["Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta", "Pasta_al_Forno", "Indische_Gerichte",
    "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
    "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]
  constructor() { 

  }

  ngOnInit() {
  }

  increaseTheOptionNumber(){
    this.numberOfTimesOptionArray=[];
    this.numberOfTimesOptionArray= [...Array(++this.numberOfTimesOption).keys()] ;
  }

  increaseTheAdditionNumber(){
    this.numberOfTimesAdditionArray=[];
    this.numberOfTimesAdditionArray= [...Array(++this.numberOfTimesAdditions).keys()] ;
  }


}

class NewProductAddition{

  additionDescription:string;
  additionPrice:number;
}
