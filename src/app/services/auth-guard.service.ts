import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { ControlPanelService } from './controlpanel.service';

@Injectable()
export class AuthGuardService implements CanActivate{

    constructor(private controlPanelService:ControlPanelService,private router:Router){

    }

    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
if(this.controlPanelService.isUserLoggedIn   &&  localStorage.getItem('token')!=='null') {
    return true;
}else{
   this.router.navigate(['/login']);
   return false;
    }

}

}