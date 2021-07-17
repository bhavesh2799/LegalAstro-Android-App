import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage implements OnInit {
  userData:any = [];
  userinfo = '';
  constructor(private afs:AngularFirestore,private loadingCtrl:LoadingController,
    private socialSharing:SocialSharing,private clipboard:Clipboard,private actionSheetController:ActionSheetController,
    private iab: InAppBrowser,private toastr:ToastController) {
    console.log(atob(window.location.href.split('/saved/')[1].split('%3D')[0]));
    this.userData.isAdmin=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[0];
    this.userData.email=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[1];
    this.userData.password=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[2];
    this.userData.name=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[3];

    this.userData.deviceId=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[4];
    this.userData.userId=atob(window.location.href.split('/saved/')[1].split('%3D')[0]).split('randomNameByMe')[5];
    this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name+'randomNameByMe'+this.userData.deviceId+'randomNameByMe'+this.userData.userId;
    this.loadSavedArticlesFirebase()

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
   savedArticles :any = [];
   Articles:any = [];

  ngOnInit() {
  }
  counter: number;
maxImagesCount: number = document.images.length;
updateCounter() {
  this.counter++;
  if ( this.counter === this.maxImagesCount ) {
      console.log( 'All images loaded!' );
  }
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
  limit(text){
    if (text.length >300){
      return text.substr(0,300)+'...';
    }
    else{
      return text;
    }}
  loadSavedArticlesFirebase(){
    this.presentLoadingText()
    this.savedArticles =[];
    this.Articles = [];
    let userDoc = this.afs.firestore.collection(`savedArticles`);
    userDoc.get().then((querySnapshot) => { 
     
      
        
     
      querySnapshot.forEach(async (doc) => {
        if(doc.id == this.userData.email){
          this.savedArticles = doc.data().ids;
        }
  })}).then(()=>{
    let userDoc = this.afs.firestore.collection(`articles`);
    userDoc.get().then((querySnapshot) => { 
     
      
        
     
      querySnapshot.forEach(async (doc) => {
        for(let i=0;i<this.savedArticles.length;i++){
          if(doc.id == this.savedArticles[i]){
            this.Articles[this.Articles.length] = doc.data();
          }
        }
        
       
  })
  
    
  }).then(()=>{
    this.Articles.reverse();
    this.loading.dismiss();
  })
})}
stock=''
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
delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
loading:any
async presentLoadingText() {
  this.loading = await this.loadingCtrl.create({
    spinner: 'circles',
    message: 'Loading Articles...'
  });

  
  await this.loading.present();
}
  async getData(){
  this.loadSavedArticlesFirebase();
  await this.delay(2000);

  let searchQuery = this.stock;
  console.log('Clicked: ', searchQuery)
  let tempFeed = [];
  if(searchQuery.length >= 1){
    for(let i=0;i<this.Articles.length;i++){
      if(this.Articles[i].Body.toLowerCase().includes(searchQuery.toLowerCase())
      || this.Articles[i].Heading.toLowerCase().includes(searchQuery.toLowerCase())
      || this.Articles[i].Source.toLowerCase().includes(searchQuery.toLowerCase())
      || this.Articles[i].Dated.toLowerCase().includes(searchQuery.toLowerCase())
      ){        tempFeed[tempFeed.length] = this.Articles[i];
    }
   
  }
  this.Articles = tempFeed;
  if(this.Articles.length == 0){
    this.toast('Search Response','Sorry, this keyword is not present in any article','primary')
  }
}

 
  
}

setFilteredItems(val){
  console.log(val.toUpperCase());
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
  async openWeb(url) {
    const browser = this.iab.create(url);

   
    browser.on('loadstop').subscribe(event => {
       
    });
    
     }
     text = '';
     image = '';
     body = '';
     url = "https://play.google.com/store/apps/details?id=com.legully.genienews";
     shareArticle(img, head,body){
       this.text=head;
       this.image = img;
       this.body = body;
       console.log('Text: ',this.text)
       console.log('Image: ',this.image)
       console.log('Body: ',this.body)
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
