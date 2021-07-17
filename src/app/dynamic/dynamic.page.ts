import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.page.html',
  styleUrls: ['./dynamic.page.scss'],
})
export class DynamicPage implements OnInit {
  userData:any = [];
  userinfo:any=[];

  constructor(private afs:AngularFirestore,private router:Router,
    private actionSheetController:ActionSheetController,
    private iab: InAppBrowser) { 
    console.log(atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]));
    this.userData.isAdmin=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[0];
    this.userData.email=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[1];
    this.userData.password=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[2];
    this.userData.name=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[3];

    this.userData.deviceId=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[4];
    this.userData.userId=atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[5];
    this.userData.res = atob(window.location.href.split('/dynamic/')[1].split('%3D')[0]).split('randomNameByMe')[6] || "";
    this.fetch(this.userData.res);
    this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name+'randomNameByMe'+this.userData.deviceId+'randomNameByMe'+this.userData.userId;

    console.log(this.userData);
  }
  async openWeb(url) {
    const browser = this.iab.create(url);

   
    browser.on('loadstop').subscribe(event => {
       
    });
    
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
    routerHome(){
      this.router.navigateByUrl('/home/'+btoa(this.userinfo))
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

  ngOnInit() {
   
  }
  article:any = [];
  fetch(id){
    this.article = [];
    this.afs.collection('articles').doc(id).ref.get().then((res)=>{
      this.article = res.data();
    })
  }
}
