import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { productItem } from 'src/app/models/product.interface';
import { CatalogService } from 'src/app/services/catalogservice';


@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  @Input('product') product: productItem;
  @Output('delete') delete = new EventEmitter<boolean>();
  startDeleteOperation:boolean;
  constructor() { }

  ngOnInit() {
  }
  cancel() {
    this.delete.next(false);
  }

  doDelete(){
    this.startDeleteOperation=true;
    this.delete.next(true);
  }

 
}
