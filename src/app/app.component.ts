import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Website';


  list:string[]=["Indische_Vorspeisen","Salat","Pizza","Vegatarische_Pizza","Calzone","PizzabrotØ30","Pasta","Pasta_al_Forno",
  "Indische_Gerichte",
    "Gyros_Spezialitäten","International_Gerichte","Rösti","Döner_kebab","Lahmacun,Vegatarische_Döner","Pide,Dessert",
    "BenAndJerrys","Alkohalfrei_Getränke","Alkohlische_Getränke"];
  constructor(){

  }
}
