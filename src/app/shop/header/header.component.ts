import { Component, OnInit } from '@angular/core';
import {map} from 'Rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   price:number=0;
   quantity:number=0;
  static price1:number=0;
  static quantity1:number=0;
  constructor() { }

  ngOnInit() {
  }



}
