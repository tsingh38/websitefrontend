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
  selectedCategory: "Beliebte";
  productsForSelectedCategory: productItem[];
  totalPriceInShoppingCart:number;
  totalNumberOfItemsInCart:number;
  searchFieldActivated = false;
  categories: string[] = ["Beliebte", "Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta","Pasta_al_Forno", "Indische_Gerichte",
    "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
    "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]

  constructor(private mealService: MealService,private cartService:CartService,private router:Router) {
    this.allProductItems = this.mealService.fetchAllItems();
  }

  ngOnInit() {
    this.totalPriceInShoppingCart=this.cartService.totalOrderPrice;
  if( !this.productsForSelectedCategory  || this.productsForSelectedCategory.length < 1){
    this.productsForSelectedCategory=this.allProductItems;
  }
  this.cartService.totalOrderPriceEmitter.subscribe((param)=>{
    this.totalPriceInShoppingCart=param.price;
    this.totalNumberOfItemsInCart=param.quantity;
  });
  }



  mainCategorySelected(event: Event) {
    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    console.log(selectedCategory);
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
