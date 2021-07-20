import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
// import { ImgLoaderComponent } from 'ionic-image-loader';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, IonRouterOutlet, LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
const { App } = Plugins;
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Clipboard } from '@ionic-native/clipboard/ngx';

const { PushNotifications } = Plugins;
import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();
const { FCMPlugin } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  newsFeed:any=[];
  userData:any=[];
  userinfo='';
  userCategory='';
  userInterests=[];
  userArticles=[];
  userStates = [];
  userTypes = [];
  tags :any = [];
  savedArticles:any = [];
  // async share(){
  //   await Share.share({
  //     title: 'LegalAstro News',
  //     text: 'Get Latest News for Indian Laws and',
  //     url: 'http://ionicframework.com/',
  //     dialogTitle: 'Share with Friends',
  //   });
  // }


  constructor(private route:ActivatedRoute,private firebaseDynamicLinks:FirebaseDynamicLinks,private clipboard: Clipboard,private platform:Platform,
    public modalController: ModalController,private loadingCtrl:LoadingController,private socialSharing: SocialSharing,
    private router:Router,private afs:AngularFirestore,private actionSheetController:ActionSheetController,
    private iab: InAppBrowser,private toastr:ToastController,private http:  HttpClient,private plt:Platform,    private routerOutlet: IonRouterOutlet,
    
    ) {
      this.plt.backButton.subscribeWithPriority(10, () => {
        if (!this.routerOutlet.canGoBack()) {
          App.exitApp();
        }
      });
    console.log(atob(window.location.href.split('/home/')[1].split('%3D')[0]));
    this.userData.isAdmin=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[0];
    this.userData.email=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[1];
    this.userData.password=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[2];
    this.userData.name=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[3];

    this.userData.deviceId=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[4];
    this.userData.userId=atob(window.location.href.split('/home/')[1].split('%3D')[0]).split('randomNameByMe')[5];
    this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name+'randomNameByMe'+this.userData.deviceId+'randomNameByMe'+this.userData.userId;


   

  }
  // onImageLoad(imgLoader: ImgLoaderComponent) {
  //   // do something with the loader
  // }
  counter: number;
maxImagesCount: number = document.images.length;
updateCounter() {
  this.counter++;
  if ( this.counter === this.maxImagesCount ) {
      console.log( 'All images loaded!' );
  }
}
  ngOnInit(){
    this.tagsModal();
    this.dynamic();
    this.loadSavedArticlesFirebase()
      PushNotifications.requestPermission().then(result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register().then(() => {
            //
            // Subscribe to a specific topic\
            // you can use `FCMPlugin` or just `fcm`
        
      })
    
            
  
  //
  // Check the auto initialization status
    }
         else {
          // Show some error
        }
      });
  
      PushNotifications.addListener(
        'registration',
        (token: PushNotificationToken) => {
          console.log('Push registration success, token: ' + token.value);
          this.afs.collection('tokens').doc(token.value).set({
            'Token':token.value
          })
        },
      );
  
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
  
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotification) => {
          console.log('Push received: ' + JSON.stringify(notification));
          this.toast(notification["title"],notification["body"],"primary");
          
  
        },
      );
  
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
          if(notification['notification']['data']['Link']){
            this.router.navigateByUrl('/dynamic/'+btoa(this.userinfo+'randomNameByMe'+notification['notification']['data']['Link']))
          }

        },
      );
      
    
      
   
  }
  loading:any
  async presentLoadingText() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Loading Articles...'
    });
  
    
    await this.loading.present();
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.tagsModal();
    this.loadSavedArticlesFirebase();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 300);
  }
  async toast(header,message,status){
    const toast = await this.toastr.create({
      header:header,
      message:message,
      position:'top',
      color: status,
      duration:2000
    });
    toast.present();
    

}//end of toast
  flag = 0;
  tagsModal(){
    this.newsFeed = [];
    let i = 0;
    let userDoc = this.afs.firestore.collection(`users`);
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        if ((doc.data().email == this.userData.email)){
          this.userCategory = doc.data().catId;
          if(doc.data().catId){
            this.flag = 1;
          }
          this.userInterests=doc.data().interestsId;
          this.userStates = doc.data().statesId;
          this.userTypes = doc.data().typesId;
          
          // console.log('User Info: ',this.userCategory,this.userInterests,this.userStates,this.userTypes);

               }
        })}).then(()=>{
          this.presentLoadingText()
            let userDoc = this.afs.firestore.collection(`articles`).orderBy('ArticleId','desc').limit(50);
            
    userDoc.get().then((querySnapshot) => { 
      
      
        
     
      querySnapshot.forEach((doc) => {
        //All articles one by one

        // Article Selection: User Type
        if(this.flag==1){
          if(this.similarElements(this.userCategory,doc.data().userTypes) && this.similarLists(this.userInterests,doc.data().interests)){
            // Selection : Interests
            
                  this.newsFeed[i] = doc.data();
                    i++;
               
  
          }
        }
        else{
           
          
          this.newsFeed[i] = doc.data();
          i++;

        }
        
        
        
        


            
          })
        }).then(()=>{
          this.loading.dismiss();
          FCMPlugin.setAutoInit({ enabled: true }).then(() => {console.log(`Auto init enabled`);
          if(this.flag == 1){
            for(let i=0;i<this.userInterests.length;i++){
            
              FCMPlugin
              .subscribeTo({ topic: this.userInterests[i].split(' ')[0] })
             
        
            }
          }
          if(this.flag == 0){
            FCMPlugin
          .subscribeTo({ topic: 'Notification1' }).then((r) => {console.log(`subscribed to topic`)})
       
          }
          })
          
          
          // console.log('Final: ',this.newsFeed);
          let temp = []
          for(let i=0; i<this.newsFeed.length;i++){
            for(let j=i;j<this.newsFeed.length;j++){
              if(Number(this.newsFeed[i].ArticleId) < Number(this.newsFeed[j].ArticleId)){
                temp = this.newsFeed[j];
                this.newsFeed[j] = this.newsFeed[i];
                this.newsFeed[i] = temp;
              }
            }
          }
         

        })
        
        // else if ((this.userArticles != []) || this.userInterests != [] || this.userCategory != ''){
        //   console.log('Article Tags: ',this.userArticles);
        //   console.log('Interest Tags: ',this.userInterests);
        //   console.log('Category: ',this.userCategory);


        // } 
      
      })
        

   


     
  }
  dynamic(){
    this.firebaseDynamicLinks.onDynamicLink()
.subscribe((res: any) => {
  console.log('Result from dynamic link: ',JSON.parse(JSON.stringify(res)));
  this.openWeb(JSON.parse(JSON.stringify(res))['deepLink'])
}
  , (error:any) => console.log(error));
  }
  similarElements(ele,list){
    let j = 0;
    for(let i=0;i<list.length;i++){
      // console.log('List element: ',list[i].substr(0,3).toUpperCase())
      if(ele.toUpperCase() == list[i].substr(0,3).toUpperCase()){
        // console.log('List Ele Values: ',list[i].substr(0,3).toUpperCase())
        j =1;
        break;
      }


    }
    if(j==0){
      return false
    }
    else if(j ==1){
      return true
    }

  }
  similarLists(list1,list2){
    for(let i=0;i<list1.length;i++){
      for(let j=0;j<list2.length;j++){
        if(list1[i].toUpperCase() == list2[j].toUpperCase()){
          return true;
        }
      }
    }
    return false;
  }
 
  redirectToFilters(){
    this.router.navigateByUrl(`/filters/${btoa(this.userinfo)}`)
  }
  limit2(text){
    let numWords = text.split(' ').length;
    // console.log('Number of words: ',numWords)
    if(numWords > 9 ){
      return text.split(' ')[0]+' '+text.split(' ')[1]+' '+text.split(' ')[2]+' '+text.split(' ')[3]+' '+text.split(' ')[4]+' '+text.split(' ')[5]+' '+text.split(' ')[6]+' '+text.split(' ')[7]+' '+text.split(' ')[8]+'...'
    }
    else{
      return text;
    }

  }
  limit(text){
    if (text.length >245){
      return text.substr(0,245)+'...';
    }
    else{
      return text;
    }}
    async presentSheet() {
      const actionSheet = await this.actionSheetController.create({
        mode:"ios",
        translucent:true,
        backdropDismiss:true,
        
        cssClass: 'my-custom-class',
        buttons: [ {
          text: 'Filters',
          icon: 'pencil-outline',
          handler: () => {
            console.log('Filters clicked');
            this.router.navigateByUrl(`/filters/${btoa(this.userinfo)}`)
          }
        },{
          text: 'Invite Friends',
          icon: 'people-outline',
          handler: () => {
            console.log('Refer clicked');
            this.router.navigateByUrl(`/refer`)
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }
    async openWeb(url) {
      const browser = this.iab.create(url);
  
     
      browser.on('loadstop').subscribe(event => {
         
      });
      
       }

  styleHeads(val){
    let value = '';
    
   

    if(val.length > 1){
      for(let i=0;i<val.length;i++){
        if(i < val.length - 2){
         value +=val[i]+", ";
        }
        else if (i == val.length - 2){
         value +=val[i]+" and "+val[i+1];
        }
        
        
      
      return value;
 
     }
    }
    else{
      return val[0];
    }
    
    
  }
  dynamicActionSheet(article,n){
    if(n == 1){
      this.presentActionSheet1(article);
    }
    else if(n == 2){
      this.presentActionSheet2(article);

    }
    else if(n == 3){
      this.presentActionSheet3(article);

    }
    else if(n == 4){
      this.presentActionSheet4(article);

    }
    else if(n == 5){
      this.presentActionSheet5(article);

    }
    else if(n == 6){
      this.presentActionSheet6(article);

    }


  }
  async presentActionSheet1(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode:"ios",
      translucent:true,
      backdropDismiss:true,
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheet2(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Download PDF 2',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl1,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheet3(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode:"ios",
      translucent:true,
      backdropDismiss:true,
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Download PDF 2',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl1,"_blank");
        }
      },{
        text: 'Download PDF 3',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl2,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheet4(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode:"ios",
      translucent:true,
      backdropDismiss:true,
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Download PDF 2',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl1,"_blank");
        }
      },{
        text: 'Download PDF 3',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl2,"_blank");
        }
      },{
        text: 'Download PDF 4',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl3,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheet5(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode:"ios",
      translucent:true,
      backdropDismiss:true,
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Download PDF 2',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl1,"_blank");
        }
      },{
        text: 'Download PDF 3',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl2,"_blank");
        }
      },{
        text: 'Download PDF 4',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl3,"_blank");
        }
      },{
        text: 'Download PDF 5',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl4,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  async presentActionSheet6(article) {
    const actionSheet = await this.actionSheetController.create({
      cssClass: 'my-custom-class',
      mode:"ios",
      translucent:true,
      backdropDismiss:true,
      buttons: [{
        text: 'Download PDF 1',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl0,"_blank");
        }
      },{
        text: 'Download PDF 2',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl1,"_blank");
        }
      },{
        text: 'Download PDF 3',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl2,"_blank");
        }
      },{
        text: 'Download PDF 4',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl3,"_blank");
        }
      },{
        text: 'Download PDF 5',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl4,"_blank");
        }
      },
      {
        text: 'Download PDF 6',
        icon: 'arrow-down-circle-outline',
        handler: () => {
          window.open(article.PdfUrl5,"_blank");
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  openTwitter(article){
    var myHeaders = new Headers();
    

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

fetch(`https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2Ftwiterdev`, requestOptions)
  .then(response => response.json())
  .then(result => {console.log(result)})
  .catch(error => console.log('error', error));
  }
  
  

  

  


























































































  slideOpts = {
    slidesPerView: 1,
    initialSlide: 1,

    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
     
      
    },
    on: {
      beforeInit() {
        const swiper = this;
  
        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;
  
           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);
  
           let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;
  
           // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;
  
           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  
           $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }
  
         // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
      },
      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }


  token = "AAAAAAAAAAAAAAAAAAAAAJM7OwEAAAAASCSs1AFhWI%2BVsJq8dLg07r%2B%2BPfo%3DKCJq1joR6gTAHRz21cT1jPbfY037w4EQJGNRPTkOvaVOd4OgRh"
  
replacer(val){
  if(val == "Government Notifications"){
    return "Notifications";
  }
  else if(val == "Website and Functional Updates"){
    return "Updates";
  }
  else{
    return val;
  }
}
isSaved(val){
  //true if saved, false if not
  for(let i=0;i<this.savedArticles.length;i++){
    if(val == this.savedArticles[i]){
      this.isSavedVal = true;
      return this.isSavedVal;
    }
  }
  return false;
}
isSavedVal = false;
remover(val,articles){
  let article = articles;
  for(let i=0;i<article.length;i++){
    if(val  == article[i]){
      delete article[i];
      
    }
  }
  return articles;
  
}
addToSaved(val){
  if(this.isSaved(val)){
   
    this.isSavedVal = false;
    const index = this.savedArticles.indexOf(val);
if (index > -1) {
  this.savedArticles.splice(index, 1);
}
    // console.log(this.savedArticles);
   this.toast("","Article Removed from your Saved Library!","primary")
    //remove from saved: Update to firebase
    let userDoc = this.afs.firestore.collection(`savedArticles`);
  userDoc.get().then((querySnapshot) => { 
   
    
      
   
    querySnapshot.forEach(async (doc) => {
      if(doc.id == this.userData.email){
        this.afs.collection('savedArticles').doc(this.userData.email).set({
          'ids':this.savedArticles
        })
}})})
   

  }
  else{
    //add to saved
    this.savedArticles[this.savedArticles.length] = val;
    this.isSavedVal = true;
    let flag = false;
    this.toast("","Article Added to your Saved Library!","primary")
    //add to saved: Update to firebase
    let userDoc = this.afs.firestore.collection(`savedArticles`);
  userDoc.get().then((querySnapshot) => { 
   
    
      
   
    querySnapshot.forEach(async (doc) => {
      if(doc.id == this.userData.name){
        this.afs.collection('savedArticles').doc(this.userData.email).set({
          'ids':this.savedArticles
        })
        flag = true;
}})}).then(()=>{
  if(flag == false){
    this.afs.collection('savedArticles').doc(this.userData.email).set({
      'ids':this.savedArticles
    })
  }
})

  }
}
loadSavedArticlesFirebase(){
  let userDoc = this.afs.firestore.collection(`savedArticles`);
  userDoc.get().then((querySnapshot) => { 
   
    
      
   
    querySnapshot.forEach(async (doc) => {
      if(doc.id == this.userData.email){
        this.savedArticles = doc.data().ids;
      }
})})

}
routeSaved(){
  this.router.navigateByUrl("/saved/"+btoa(this.userinfo));
}
stock='';
staticFeed :any = []
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
  async getData(){
  this.tagsModal();
  await this.delay(2000);

  let searchQuery = this.stock;
  // console.log('Clicked: ', searchQuery)
  let tempFeed = [];
  if(searchQuery.length >= 1){
    for(let i=0;i<this.newsFeed.length;i++){
      if(this.newsFeed[i].Body.toLowerCase().includes(searchQuery.toLowerCase())
       || this.newsFeed[i].Heading.toLowerCase().includes(searchQuery.toLowerCase())
       || this.newsFeed[i].Source.toLowerCase().includes(searchQuery.toLowerCase())
       || this.newsFeed[i].Dated.toLowerCase().includes(searchQuery.toLowerCase())
       ){
        tempFeed[tempFeed.length] = this.newsFeed[i];
    }
   
  }
  this.newsFeed = tempFeed;
  if(this.newsFeed.length == 0){
    this.toast('Search Response','Sorry, this keyword is not present in any article','primary')
  }
}

 
  
}

setFilteredItems(val){
  console.log(val.toUpperCase());
}
text = '';
image = '';
body = '';
url = "https://play.google.com/store/apps/details?id=com.legully.genienews";
shareArticle(img, head,body){
  this.text=head;
  this.image = img;
  this.body = body;

  this.presentActionSheet();

}
async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header:'Share Article with Friends',
    mode:"ios",
    translucent:true,
    backdropDismiss:true,

   
    buttons: [
    //  {
    //   text: 'Share via WhatsApp',
    //   icon: 'logo-whatsapp',
    //   handler: () => {
    //     console.log('Share clicked');
    //     this.fn1()
    //   }
    // }, 
    {
      text: 'Share via Facebook',
      icon: 'logo-facebook',
      handler: () => {
        console.log('Play clicked');
        this.fn3();
      }
    }, {
      text: 'Share via Twitter',
      icon: 'logo-twitter',
      handler: () => {
        console.log('Favorite clicked');
        this.fn4();
      }
    }, {
      text: 'Share via Email',
      icon: 'mail',
      handler: () => {
        console.log('Play clicked');
        this.fn5();
      }
    }, {
      text: 'Copy to Clipboard',
      icon: 'copy',
      handler: () => {
        console.log('Favorite clicked');
        this.fn0();
      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}
fn0(){
  this.clipboard.copy(this.text+" Read more in LegalAstro News App. "+this.url);

this.clipboard.paste().then(
 (resolve: string) => {
    this.toast('','Article Heading Copied to Clipboard!',"primary")
  },
  (reject: string) => {
    this.toast('','Error: ' + reject,'danger');
  }
);

this.clipboard.clear();
}
fn1(){

  this.socialSharing.shareViaWhatsApp(this.text, this.image, this.url).then((res) => {
    // Success
  }).catch((e) => {
    // Error!
    this.toast('','Error: ' + e,'danger');
  });
}
fn2(){
  this.socialSharing.shareViaInstagram(this.text, this.image).then((res) => {
    // Success
  }).catch((e) => {
    // Error!
    this.toast('','Error: ' + e,'danger');
  });
}
fn3(){
  this.socialSharing.shareViaFacebook(this.text, this.image, this.url).then((res) => {
    // Success
  }).catch((e) => {
    // Error!
    this.toast('','Error: ' + e,'danger');
  });
}
fn4(){
  this.socialSharing.shareViaTwitter(this.text, this.image, this.url).then((res) => {
    // Success
  }).catch((e) => {
    // Error!
    this.toast('','Error: ' + e,'danger');
  });
}
fn5(){
  let body =this.body +" Play Store link for LegalAstro: https://play.google.com/store/apps/details?id=com.legully.genienews";
  let subject =  this.text;
  this.socialSharing.canShareViaEmail().then((res) => {
    // Success
    this.socialSharing.shareViaEmail(body, subject, ['recipient@example.org']).then((res) => {
      // Success
    }).catch((e) => {
      // Error!
      this.toast('','Error: ' + e,'danger');
    })
  }).catch((e) => {
    // Error!
    this.toast('','Error: ' + e,'danger');
  });
}


}
