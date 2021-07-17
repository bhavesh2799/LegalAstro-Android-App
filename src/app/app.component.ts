import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController, ToastController } from '@ionic/angular';
const { Device } = Plugins;
const { FCMPlugin } = Plugins;

import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private afs:AngularFirestore,private afauth:AngularFireAuth,private firebaseDynamicLinks: FirebaseDynamicLinks,private loadingCtrl:LoadingController,
    private route:ActivatedRoute,private router:Router,private toastr:ToastController
    
    ) {
      this.dynamic();
      this.getDeviceInfo().then(()=>{
        this.autoLogin();
      })
      
    }

  userinfo:any=[];
  store:any=[];
  deviceId='';
  isRegistered=false;
  async getDeviceInfo(){
    await Device.getInfo().then((data)=>{
      console.log(data);
      this.deviceId=data.uuid;
      console.log(this.deviceId);
    });
    
    
    
  }
  async autoLogin(){
    const loading = await this.loadingCtrl.create({
      message:'loading...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();
    // this.deviceId=this.getDeviceInfo();
    let store:any = []
    let userDoc = this.afs.firestore.collection(`users`);
    userDoc.get().then((querySnapshot) => { 
      this.userinfo=[];
      this.store=[];
      
        
     
      querySnapshot.forEach(async (doc) => {
        // console.log(doc.id, "=>", doc.data());
        if ((doc.data().deviceId == this.deviceId )){
          
         
          store = doc.data();
          this.isRegistered=true;
          this.userinfo = store.isAdmin+'randomNameByMe'+store.email+'randomNameByMe'+store.password+'randomNameByMe'+store.name+'randomNameByMe'+store.deviceId+'randomNameByMe'+store.userId;
          console.log(this.userinfo);
          console.log('just before routing from login: ',btoa(this.userinfo))
          FCMPlugin.setAutoInit({ enabled: true }).then(() => console.log(`Auto init enabled`))

          
         
          
        
        
        }})}
        ).then(()=>{
          if(this.isRegistered){
            this.router.navigate([`/home/${btoa(this.userinfo)}`]);
            
          }
         
          else{
            // this.toast('This device or user is not registered yet!',"primary");
            this.router.navigateByUrl('/register');
          }
          loading.dismiss();
        })
  
      
      }
      async toast(message,status){
        const toast = await this.toastr.create({
          message:message,
          position:'top',
          color: status,
          duration:2000
        });
        toast.present();
    
    }//end of toast
    dynamic(){
      this.firebaseDynamicLinks.onDynamicLink()
  .subscribe((res: any) => {
    console.log(res);
    this.router.navigateByUrl('/dynamic'+btoa(this.userinfo+'randomNameByMe'+res))

  }
    , (error:any) => console.log(error));
    }
  
}
