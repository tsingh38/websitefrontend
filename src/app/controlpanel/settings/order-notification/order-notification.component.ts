import { Component, OnInit } from '@angular/core';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { OrderNotificationSoundInterface } from 'src/app/models/orderNotificationSound.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.scss']
})
export class OrderNotificationComponent implements OnInit {

  private notificationStatus:string='Aus';
  private currentSelectedSound:string='';
  private updatedNotificationFile:string="";
  private allSounds:OrderNotificationSoundInterface[]=[];
  constructor(private httpService:HttpUtil) { }
  private showInfotext:boolean=false;
  private srvMessage:string="";
  private success:boolean=false;

  ngOnInit() {
    this.httpService.getNotificationSounds().subscribe(res => {
      for(let currentSound of res){
        if(currentSound.toneOn){
         this.notificationStatus='An';
        }
        this.allSounds.push(currentSound);
      }
    }, error => {
      console.log("if error");
    })
  }

  existsValidEnabledSoundIfStatusIsOn():boolean{
    for(let sound of this.allSounds){
      if(sound.toneOn){
        return true;
      }
    }
  }
  onSubmit(){
    if(this.notificationStatus=='An' && !this.existsValidEnabledSoundIfStatusIsOn()){
      this.showInfotext=true;
      this.srvMessage="Wenn Klingel Status 'An' ist,soll eine in der Liste ausgewählt sein.";
      this.success=false;
      setTimeout(function () {
        this.showInfotext = false;
      }.bind(this), 3000);
   return;
    }
    this.httpService.updateNotificationSoundStatus(this.allSounds).subscribe(()=>{
      this.showInfotext=true;
      this.srvMessage="Klingel Status Erfolgreich upgedated";
      this.success=true;
      setTimeout(function () {
        this.showInfotext = false;
      }.bind(this), 3000);
    },error=>{
      this.showInfotext=true;
      this.srvMessage="Klingel Status könnte nicht Erfolgreich upgedated werden";
      this.success=false;
      setTimeout(function () {
        this.showInfotext = false;
      }.bind(this), 3000);
    })
  }

  updateCheckboxesOnChange(){
    if(this.notificationStatus==='Aus'){
     for(let sound of this.allSounds){
       sound.toneOn=false;
     }
    }
  }

  handleStatusChange(event:Event,changedIndex:number){
    var isChecked:Boolean=event.target.checked;
    if(!isChecked){
      this.allSounds[changedIndex].toneOn=false;
    }else{
    let i=0;
    for(let currentSound of this.allSounds){
    if(i==changedIndex){
       i++;
       currentSound.toneOn=true;
      continue;
    }else{
      currentSound.toneOn=false;
    }
      i++;
  }
}
  }

  playAudio(sound:OrderNotificationSoundInterface){
    let audio = new Audio();
    audio.src = environment.soundsURL+sound.toneName;
    audio.load();
    audio.play();
  }


}
