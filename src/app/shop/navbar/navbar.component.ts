import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
menuBarItemsAll:String[]=['Pizza','Indisch','Salat','Italinisch','Drink','AlkohalfreiGetäanke','Pide','Donör','Something1','Someething2','AlkohalfreiGetäanke','Something3','Someething21','Someething25']
isSearchBarActive=false;

constructor() {
 }

  ngOnInit() {
  }



 

}
