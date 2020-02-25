import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { ControlPanelService } from './controlpanel.service';
import { CustomerOrderService } from '../shop/customer-information/CustomerOrderService';

@Injectable()
export class NavGuardService implements CanActivate{

    constructor(private cartService:CartService,private customerOrderService:CustomerOrderService, private router:Router){

    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
if((this.cartService.order &&  this.cartService.order.length > 0) || this.customerOrderService && this.customerOrderService.orderNumberFromServer > 0)  {
    return true;
}else{
   this.router.navigate(['/']);
   return false;
}


}

}