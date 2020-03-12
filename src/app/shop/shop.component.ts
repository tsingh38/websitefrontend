import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MealService } from '../services/mealservice';
import { productItem, productItemAddition, productItemOption } from '../models/product.interface';
import { ShopTimingsUtil } from '../services/ShopTimingsUtil.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private fragment: string;

  show = 3;
  isShopAvailable: boolean;
  allProductItems: productItem[] = [];
  selectedCategory: string = "Beliebte";
  productsForSelectedCategory: productItem[];
  totalPriceInShoppingCart: string;
  isCartVisible:boolean;
  totalNumberOfItemsInCart: number;
  categories: string[] = ["Beliebte", "Indische_Vorspeisen", "Salat", "Pizza", "Vegatarische_Pizza", "Calzone", "PizzabrotØ30", "Pasta", "Pasta_al_Forno", "Indische_Gerichte",
    "Gyros_Spezialitäten", "International_Gerichte", "Rösti", "Döner_kebab", "Lahmacun", "Vegatarische_Döner", "Pide", "Dessert",
    "BenAndJerrys", "Alkohalfrei_Getränke", "Alkohlische_Getränke"]
  shopClosedHeaderMessage = "Im Moment ist die Geschäft geschlossen";
  shopClosedMessage = "Die Bestellungen außerhalb unseren Geschäftszeiten können  nicht bearbeitet werden."
  constructor(private mealService: MealService, private cartService: CartService, private router: Router) {
    this.allProductItems = this.mealService.fetchAllItems();
  }

  ngOnInit() {
    this.isShopAvailable = ShopTimingsUtil.isShopOpenNow();
    this.isCartVisible= this.totalPriceInShoppingCart && Number(this.totalPriceInShoppingCart) > 0;
    this.totalPriceInShoppingCart = this.getPriceWith2DecimalPlaces(this.cartService.totalOrderPrice);
    if (!this.productsForSelectedCategory || this.productsForSelectedCategory.length < 1) {
      this.productsForSelectedCategory = this.allProductItems;
    }
    this.cartService.totalOrderPriceEmitter.subscribe((param) => {
      this.totalPriceInShoppingCart = this.getPriceWith2DecimalPlaces(param.price);
      this.totalNumberOfItemsInCart = param.quantity;
      this.isCartVisible= this.totalPriceInShoppingCart && Number(this.totalPriceInShoppingCart) > 0;
    });
  }


  getPriceWith2DecimalPlaces(price: Number) {
    return parseFloat(price + "").toFixed(2);
  }
  getCategoryImageSource(index: number) {
    if (this.selectedCategory) {
      switch (this.selectedCategory) {
        case "Indische_Vorspeisen":
          switch (index) {
            case 1: return "../../assets/indischevorspeise1.jpg";
            case 2: return "../../assets/indischevorspeise2.jpg";
          }

        case "Salat":
          switch (index) {
            case 1: return "../../assets/salat_1.jpg";
            case 2: return "../../assets/salat_2.jpg";
          }

        case "Pizza": switch (index) {
          case 1: return "../../assets/pizza_1.jpg";
          case 2: return "../../assets/pizza_2.jpg";
        }
        case "Vegatarische_Pizza": switch (index) {
          case 1: return "../../assets/vegpizza.jpg";
          case 2: return "../../assets/pizza_2.jpg";
        }
        case "Calzone": switch (index) {
          case 1: return "../../assets/calzone_1.jpg";
          case 2: return "../../assets/calzone_2.jpg";
        }
        case "PizzabrotØ30": switch (index) {
          case 1: return "../../assets/pizzabrot_1.jpg";
          case 2: return "../../assets/pizzabrot_2.jpg";
        }
        case "Pasta": switch (index) {
          case 1: return "../../assets/pasta_1.jpg";
          case 2: return "../../assets/pasta_2.jpg";
        }
        case "Pasta_al_Forno": switch (index) {
          case 1: return "../../assets/Pasta_al_Forno_1.jpg";
          case 2: return "../../assets/Pasta_al_Forno_2.jpg";
        }
        case "Indische_Gerichte": switch (index) {
          case 1: return "../../assets/indischegerichte_1.jpg";
          case 2: return "../../assets/indischegerichte_2.jpg";
        }
        case "Gyros_Spezialitäten": switch (index) {
          case 1: return "../../assets/gyrosspezialitäten_1.jpg";
          case 2: return "../../assets/gyrosspezialitäten_2.jpg";
        }
        case "International_Gerichte": switch (index) {
          case 1: return "../../assets/international_1.jpg";
          case 2: return "../../assets/international_2.jpg";
        }
        case "Rösti": switch (index) {
          case 1: return "../../assets/roesti_1.jpg";
          case 2: return "../../assets/roesti_2.jpg";
        }
        case "Döner_kebab": switch (index) {
          case 1: return "../../assets/dönerkebab_1.jpg";
          case 2: return "../../assets/dönerkebab_2.jpg";
        }
        case "Lahmacun": switch (index) {
          case 1: return "../../assets/lahmacun_1.jpg";
          case 2: return "../../assets/lahmacun_2.jpg";
        }
        case "Vegatarische_Döner": switch (index) {
          case 1: return "../../assets/dönerkebab_1.jpg";
          case 2: return "../../assets/yufka.jpg";
        }
        case "Pide": switch (index) {
          case 1: return "../../assets/pide_1.jpg";
          case 2: return "../../assets/pide_2.jpg";
        }
        case "Dessert": switch (index) {
          case 1: return "../../assets/dessert_1.jpg";
          case 2: return "../../assets/dessert_2.jpg";
        }
        case "BenAndJerrys": switch (index) {
          case 1: return "../../assets/benAndJerrys_1.jpg";
          case 2: return "../../assets/benAndJerrys_2.jpg";
        }
        case "Alkohalfrei_Getränke": switch (index) {
          case 1: return "../../assets/alkohalfreiGetränke.jpeg";
          case 2: return "../../assets/alkohalfreiGetränke_2.jpeg";
        }
        case "Alkohlische_Getränke": switch (index) {
          case 1: return "../../assets/liqor.jpg";
          case 2: return "../../assets/liqor_2.jpg";
        }
        case "Beliebte": switch (index) {
          case 1: return "../../assets/Pommes_Frites.jpg";
          case 2: return "../../assets/Frühlingsrollen.jpg";
        }
        default: return "../../assets/indischegerichte.jpg";
      }
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


  submitOrder() {
    this.router.navigate(['/cart']);
  }

  onClose() {
    this.isShopAvailable = true;
  }











}
