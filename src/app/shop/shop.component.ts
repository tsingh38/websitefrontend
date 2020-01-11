import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private fragment: string;

  start=0;
  end=8;

  categories:string[]=["Indische_Vorspeisen","Salat","Pizza","Vegatarische_Pizza","Calzone","PizzabrotØ30","Pasta,Pasta_al_Forno","Indische_Gerichte",
    "Gyros_Spezialitäten","International_Gerichte","Rösti","Döner_kebab","Lahmacun","Vegatarische_Döner","Pide","Dessert",
    "BenAndJerrys","Alkohalfrei_Getränke","Alkohlische_Getränke"]
  constructor(private route: ActivatedRoute,private router:Router) { 
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        console.log(tree);
        console.log(router.url);
        console.log(tree.fragment);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }


  navigateLeft(){
if(this.start > 0){
  this.start=this.start-1;
  this.end=this.end-1;
}
  }

  navigateRight(){
if(this.end < this.categories.length){
this.start=this.start+1;
this.end=this.end+1;
  }
}
}
