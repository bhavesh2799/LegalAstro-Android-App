import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

  constructor(private socialSharing: SocialSharing,private clipboard: Clipboard,private toastr:ToastController) { }

  ngOnInit() {
  }
  text = 'LegalAstro News for Professionals, Businessmen, CA, CS and startup Enthusiasts. Install App Now!';
  image = 'https://play-lh.googleusercontent.com/ALrW7qUhWQ36nENfVNCf9WAbciFkL_f-VqPXdGHp1ztev7gPGzkqisXWXc5BUwPZEgXC=s180'
  url = 'https://play.google.com/store/apps/details?id=com.legully.genienews';
  async toast(message,status){
    const toast = await this.toastr.create({
      message:message,
      position:'top',
      color: status,
      duration:2000
    });
    toast.present();
    

}//end of toast
  fn0(){
    this.clipboard.copy(this.url);

this.clipboard.paste().then(
   (resolve: string) => {
      this.toast('App Link Copied to Clipboard!',"primary")
    },
    (reject: string) => {
      this.toast('Error: ' + reject,'danger');
    }
  );

this.clipboard.clear();
  }
  fn1(){

    this.socialSharing.shareViaWhatsApp(this.text, this.image, this.url).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
      this.toast('Error: ' + e,'danger');
    });
  }
  fn2(){
    this.socialSharing.shareViaInstagram(this.text, this.image).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
      this.toast('Error: ' + e,'danger');
    });
  }
  fn3(){
    this.socialSharing.shareViaFacebook(this.text, this.image, this.url).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
      this.toast('Error: ' + e,'danger');
    });
  }
  fn4(){
    this.socialSharing.shareViaTwitter(this.text, this.image, this.url).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
      this.toast('Error: ' + e,'danger');
    });
  }
  fn5(){
    let body = 'Play Store link for LegalAstro: https://play.google.com/store/apps/details?id=com.legully.genienews';
    let subject = 'LegalAstro News for Professionals, Businessmen, CA, CS and Startup Enthusiasts. Install App Now!'
    this.socialSharing.canShareViaEmail().then((res) => {
      // Success
      this.socialSharing.shareViaEmail(body, subject, ['recipient@example.org']).then((res) => {
        // Success
      }).catch((e) => {
        // Error!
        this.toast('Error: ' + e,'danger');
      })
    }).catch((e) => {
      // Error!
      this.toast('Error: ' + e,'danger');
    });
  }

}
