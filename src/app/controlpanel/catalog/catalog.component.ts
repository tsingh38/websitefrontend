import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { productItem, productItemAddition, productItemOption } from '../models/product.interface';
import { MealService } from 'src/app/services/mealservice';
import { AppViewContainerDirective } from 'src/app/directives/app-view-container.directive';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { Subscription } from 'rxjs';
import { CatalogService } from 'src/app/services/catalogservice';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  allProductItems:productItem[] = [];
  selectedCategory: string = "Beliebte";
  productsForSelectedCategory: productItem[];
  showInfotext:boolean;
  isOperationInProgress=false;
  srvMessage:string;
  @ViewChild(AppViewContainerDirective,{static:false}) viewContainerRef:AppViewContainerDirective;

  categories: string[] = ["Beliebte", "Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta", "Pasta_al_Forno", "Indische_Gerichte",
  "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
  "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]
  
  private closeSub:Subscription;
  
  constructor(private mealService:MealService,private catalogService: CatalogService,private componentFactoryResolver:ComponentFactoryResolver) {
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

  refreshTheProductsAfterDeletion(){
    this.allProductItems = this.mealService.fetchAllItems();
    this.productsForSelectedCategory = [];
    for (let currentProduct of this.allProductItems) {
      if (currentProduct.productCategory === this.selectedCategory) {
        this.productsForSelectedCategory.push(currentProduct);
      }
    }
  }

  delete($product:productItem) {
    this.isOperationInProgress=true;
    this.catalogService.deleteProduct($product).subscribe(() => {
      this.isOperationInProgress=false;
      this.showInfotext = true;
      this.srvMessage = "Product wurde erfolgreich gelöscht";
      this.refreshTheProductsAfterDeletion();
      setTimeout(function () {
        this.showInfotext = false;
      }.bind(this), 3000);
    }, (error) => {
      this.showInfotext = true;
      this.isOperationInProgress=false;
      this.srvMessage = "Product konnte nicht gelöscht werden";
      setTimeout(function () {
        this.showInfotext = false;
      }.bind(this), 3000);
    })
  }

  deleteConfirmation(currentProduct:productItem){
    const orderHistoryView=this.componentFactoryResolver.resolveComponentFactory(DeleteConfirmationComponent);
    const viewContainerReff= this.viewContainerRef.viewContainerRef;
    viewContainerReff.clear();
    const compRef= viewContainerReff.createComponent(orderHistoryView);
    compRef.instance.product=currentProduct;
    this.closeSub= compRef.instance.delete.subscribe(()=>{
     this.closeSub.unsubscribe;
     if(compRef.instance.startDeleteOperation){
      this.delete(compRef.instance.product);
     }
     viewContainerReff.clear(); 
   }); 
  }
}
