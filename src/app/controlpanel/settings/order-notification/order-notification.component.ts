import { Component, OnInit } from '@angular/core';
import { HttpUtil } from 'src/app/services/httpUtil.service';
import { OrderNotificationSoundInterface } from 'src/app/models/orderNotificationSound.interface';

@Component({
  selector: 'app-order-notification',
  templateUrl: './order-notification.component.html',
  styleUrls: ['./order-notification.component.scss']
})
export class OrderNotificationComponent implements OnInit {

  private notificationStatus:string='';
  private currentSelectedSound:string='';
  private updatedNotificationFile:string="";
  constructor(private httpService:HttpUtil) { }

  ngOnInit() {
    this.httpService.getNewOrderNotificationStatus().subscribe(res => {
      this.notificationStatus = res.toneOn ? 'An' : 'Aus';
      this.currentSelectedSound = res.pathOfTone;
    }, error => {
      console.log("if error");
    })
  }

  updateTheStatus(){
    const updateStatus:OrderNotificationSoundInterface={
      toneOn:this.notificationStatus==='An'?true:false,
      pathOfTone:this.currentSelectedSound

    }
    this.httpService.updateNotificationSoundStatus(updateStatus).subscribe(()=>{

    })
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../assets/"+ this.currentSelectedSound;
    audio.load();
    audio.play();
  }
  updateTheSoundFile(){
    this.currentSelectedSound= this.updatedNotificationFile.replace(/C:\\fakepath\\/, '')
    const updateStatus:OrderNotificationSoundInterface={
      toneOn:this.notificationStatus==='An'?true:false,
      pathOfTone:this.currentSelectedSound

    }
    this.httpService.updateNotificationSoundStatus(updateStatus).subscribe(()=>{

    })
  }

}
