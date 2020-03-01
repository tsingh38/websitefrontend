import { Component, OnInit } from '@angular/core';
import { productItem, productItemAddition, productItemOption } from '../models/product.interface';
import { MealService } from 'src/app/services/mealservice';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  allProductItems:productItem[] = [];
  selectedCategory: string = "Beliebte";
  productsForSelectedCategory: productItem[];
  categories: string[] = ["Beliebte", "Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta", "Pasta_al_Forno", "Indische_Gerichte",
  "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
  "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]
  constructor(private mealService:MealService) {
    this.allProductItems = this.mealService.fetchAllItems();
   }

  ngOnInit() {
    if (!this.productsForSelectedCategory || this.productsForSelectedCategory.length < 1) {
      this.productsForSelectedCategory = this.allProductItems;
    }
  }

  mainCategorySelected(event: Event) {
    var selectedCategory: string = (<HTMLTextAreaElement>event.target).value;
    this.selectedCategory = selectedCategory;
    this.productsForSelectedCategory = [];
    for (let currentProduct of this.allProductItems) {
      if (currentProduct.productCategory === selectedCategory) {
        this.productsForSelectedCategory.push(currentProduct);
      }
    }

  }
}
