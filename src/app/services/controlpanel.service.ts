import { Injectable } from '@angular/core';
import { HttpUtil } from './httpUtil.service';
import { CustOrderStatus } from '../models/custOrderStatus.interface';
import {map} from 'rxjs/operators';
import { customerOrder } from '../models/customerorder.interface';
import { DeepcopyUtil } from './Deepcopy';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable()

export class ControlPanelService{
    
    private customerOrders:CustOrderStatus[]=[];
     isUserLoggedIn:boolean;
     token:string=null;
    constructor(private http:HttpUtil,private router:Router){

    }

    getAllTheOrders(ordersFetchCategory:string){
      this.customerOrders=[];
       this.http.fetchAllCustOrders(ordersFetchCategory).pipe(map(responseData =>{
         for(let item in responseData){
               var tempFetchedResponseItem:CustOrderStatus =  responseData[item];
                 if(responseData[item].status===0){
                  tempFetchedResponseItem.status='unbearbeitet';
                 }else if(responseData[item].status===1){
                  tempFetchedResponseItem.status='bearbeitet';
                 }else if(responseData[item].status===2){
                  tempFetchedResponseItem.status='ungültig';
                 }
               
         
            this.customerOrders.push(tempFetchedResponseItem);
         }
     })).subscribe(responseData =>{
       },error=>{
      this.router.navigate(['/login']);       
       })
   
    return this.customerOrders;

    }


    

    loginUser(username:string,password:string){
      return this.http.loginUser(username,password);
    }

    processLogout(){
      return this.http.logoutUser();
    }

    
    playNotificationSound(){
      var soundSrc="";
      var isSoundOn:Boolean;
     let audio = new Audio();
     this.http.getNotificationSounds().subscribe((res)=>{
       for(let sound of res){
         if(sound.toneOn && this.router.url=='/control/orders' && this.isUserLoggedIn){
          audio.src = environment.soundsURL+sound.toneName;
          audio.load();
          audio.play();
          break;
         }
       }
    })
  }


    updateOrderStatus( currentCustOrder:CustOrderStatus,status:string){
      var tempcurrentCustOrder:CustOrderStatus= DeepcopyUtil.deepCopy(currentCustOrder);
      if(status==='unbearbeitet'){
        tempcurrentCustOrder.status='0';
       }else if(status==='bearbeitet'){
        tempcurrentCustOrder.status='1';
       }else if(status==='ungültig'){
        tempcurrentCustOrder.status='2';
       }
     this.http.updateCustOrderStatus(tempcurrentCustOrder).subscribe(params =>{
    });
    }

    }
    


