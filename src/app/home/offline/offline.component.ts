import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {

  @Input('text')offlineText:string;
  constructor() { }

  ngOnInit() {
  }

}
