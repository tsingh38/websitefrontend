import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MealService } from '../services/mealservice';
import { productItem,productItemAddition,productItemOption } from '../models/product.interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private fragment: string;

  show = 3;
  allProductItems: productItem[] = [];
  selectedCategory:string= "Beliebte";
  productsForSelectedCategory: productItem[];
  totalPriceInShoppingCart:string;
  totalNumberOfItemsInCart:number;
  searchFieldActivated = false;
  categories: string[] = ["Beliebte", "Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta","Pasta_al_Forno", "Indische_Gerichte",
    "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
    "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]

  constructor(private mealService: MealService,private cartService:CartService,private router:Router) {
    this.allProductItems = this.mealService.fetchAllItems();
  }

  ngOnInit() {
    this.totalPriceInShoppingCart= this.getPriceWith2DecimalPlaces(this.cartService.totalOrderPrice);
  if( !this.productsForSelectedCategory  || this.productsForSelectedCategory.length < 1){
    this.productsForSelectedCategory=this.allProductItems;
  }
  this.cartService.totalOrderPriceEmitter.subscribe((param)=>{
    this.totalPriceInShoppingCart=this.getPriceWith2DecimalPlaces(param.price);
    this.totalNumberOfItemsInCart=param.quantity;
  });
  }


  getPriceWith2DecimalPlaces(price:Number){
    return parseFloat(price+"").toFixed(2);
  }
  getCategoryImageSource(){
if(this.selectedCategory){
  switch(this.selectedCategory){
 case "Indische_Vorspeisen" :return "../../assets/indischevorspeise.jpg";
 case "Salat" :return "../../assets/salat.jpg";
 case "Pizza" :return "../../assets/pizza.jpg";
 case "Vegatarische_Pizza" :return "../../assets/vegpizza.jpg";
 case "Calzone" :return "../../assets/calzone.jpg";
 case "PizzabrotØ30" :return "../../assets/pizzabrot.jpg";
 case "Pasta" :return "../../assets/pasta.jpg";
 case "Pasta_al_Forno" :return "../../assets/pasta.jpg";
 case "Indische_Gerichte" :return "../../assets/indischegerichte.jpg";
 case "Gyros_Spezialitäten" :return "../../assets/gyrosspezialitäten.jpg";
 case "International_Gerichte" :return "../../assets/international.jpg";
 case "Rösti" :return "../../assets/roesti.jpg";
 case "Döner_kebab" :return "../../assets/dönerkebab.jpg";
 case "Lahmacun" :return "../../assets/lahmacun.jpg";
 case "Vegatarische_Döner" :return "../../assets/dönerkebab.jpg";
 case "Pide" :return "../../assets/pide.jpg";
 case "Dessert" :return "../../assets/dessert.jpg";
 case "BenAndJerrys" :return "../../assets/benAndJerrys.jpg";
 case "Alkohalfrei_Getränke" :return "../../assets/alkohalfreiGetränke.jpeg";
 case "Alkohlische_Getränke" :return "../../assets/liqor.jpg";

 default: return "../../assets/indischegerichte.jpg";
}   
}
  }

  mainCategorySelected(event: Event) {
    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    this.selectedCategory=selectedCategory;
    this.productsForSelectedCategory=[];
    for (let currentProduct of this.allProductItems) {
      if (currentProduct.productCategory === selectedCategory) { 
        this.productsForSelectedCategory.push(currentProduct);
      }
    }

  }


  submitOrder(){
    this.router.navigate(['/cart']);
  }

 
  
 

 



  

 
}
