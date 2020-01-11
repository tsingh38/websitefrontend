import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private cartService:CartService,private router:Router){

    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
if(this.cartService.isOrderSelected()){
    return true;
}else{
   this.router.navigate(['/']);
   return false;
}
    }
}