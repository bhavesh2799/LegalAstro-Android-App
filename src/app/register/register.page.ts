import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import fetch from 'node-fetch';

const { Device } = Plugins;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordMatch: boolean;
  companyName: any="";
  deviceId='';
 

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router,
    private navCrtl: NavController, private menu: MenuController

  ) {     this.menu.enable(false);
  }

  ngOnInit() {
   this.getDeviceInfo()
  }
  async getDeviceInfo(){
    await Device.getInfo().then((data)=>{
      console.log(data);
      this.deviceId=data.uuid;
      console.log(this.deviceId);
    });
    
    
    
  }
  async register2(){
    

  }
  isSubscribed =false;
  
  
  async register(){

    if(this.name && this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message:'loading...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email,this.password).then((data)=>{
        this.afs.collection('users').doc(data.user.uid).set({
          'userId': data.user.uid,
          'name':this.name,
          'email':this.email,
          'createdAt':Date.now(),
          'isAdmin': "false",
          'password':this.password,
          'deviceId':this.deviceId
        });
        data.user.sendEmailVerification();
        this.userinfo = "false"+'randomNameByMe'+this.email+'randomNameByMe'+this.password+'randomNameByMe'+this.name+'randomNameByMe'+this.deviceId+'randomNameByMe'+data.user.uid;

      }).then(()=>{
        if(this.isSubscribed == true){
          this.addToSubscribed()
        }

        console.log('success');
        loading.dismiss();
        this.toast("Registration Success! A verification mail has been sent to user's email address.",'success');
        // this.router.navigateByUrl(`/filters/${btoa(this.userinfo)}`)
        this.router.navigateByUrl(`/home/${btoa(this.userinfo)}`)

      }).catch((error)=>{
        loading.dismiss();
        this.toast(error.message,'danger');

      })
    
      
    }
    else{
      this.toast('Please fill in the form!','danger');
    }//end of register


   
    
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


  checkPassword(){
    if (this.password == this.confirmPassword){
      this.passwordMatch = true;
    }
    else{
      this.passwordMatch=false;
    }
  }
  redirectLogin(){
    this.router.navigate(['/login']);
  }//end of register
  resendEmail='';
  isRegistered=false;
  userinfo:any=[];store:any=[]
  async autoLogin(){
  const loading = await this.loadingCtrl.create({
    message:'loading...',
    spinner: 'crescent',
    showBackdrop: true
  });
  loading.present();
  // this.deviceId=this.getDeviceInfo();
  let userDoc = this.afs.firestore.collection(`users`);
  userDoc.get().then((querySnapshot) => { 
    this.userinfo=[];
    this.store=[];
    
      
   
    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, "=>", doc.data());
      if ((doc.data().deviceId == this.deviceId )){
       
        const store = doc.data();
        this.userinfo = store.isAdmin+'randomNameByMe'+store.email+'randomNameByMe'+store.password+'randomNameByMe'+store.name+'randomNameByMe'+store.deviceId+'randomNameByMe'+store.userId;
        console.log(this.userinfo);
        console.log('just before routing from login: ',btoa(this.userinfo))
        if(doc.data().filters){
          this.router.navigate([`/home/${this.userinfo}`]);
          this.isRegistered=true;
        }
        else{
          this.router.navigate([`/filters/${this.userinfo}`]);
          this.isRegistered=true;
        }
        
       
        
      
      
      }})}
      ).then(()=>{
        loading.dismiss();
        if(!this.isRegistered){
          this.toast('This device or user is not registered yet!',"primary");
        }
        
      })

    
    }
    addToSubscribed(){

const url = 'https://api.sendinblue.com/v3/contacts';

const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'api-key': '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'
  },
  body: JSON.stringify({
    listIds: [4],
    updateEnabled: false,
    email: this.email
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
    }

 
}
  
