import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
const { App } = Plugins;
const { PushNotifications } = Plugins;
import { FCM } from '@capacitor-community/fcm';
const fcm = new FCM();
const { FCMPlugin } = Plugins;
class Port {
  public id: number;
  public val: string;
  public isChecked: boolean;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
  
 
})


export class FiltersPage implements OnInit {
  category;
  interests:any;
   
  
  states: Port[];
  port: any;
  
  types:any;
  userData:any=[];
  userinfo='';
  tags:any = [];

  constructor(private afs:AngularFirestore,private router:Router,
    private loadingCtrl:LoadingController,private toastr:ToastController
    
    ) {
    console.log(atob(window.location.href.split('/filters/')[1].split('%3D')[0]));
    this.userData.isAdmin=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[0];
    this.userData.email=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[1];
    this.userData.password=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[2];
    this.userData.name=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[3];

    this.userData.deviceId=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[4];
    this.userData.userId=atob(window.location.href.split('/filters/')[1].split('%3D')[0]).split('randomNameByMe')[5];
    this.userinfo = this.userData.isAdmin+'randomNameByMe'+this.userData.email+'randomNameByMe'+this.userData.password+'randomNameByMe'+this.userData.name+'randomNameByMe'+this.userData.deviceId+'randomNameByMe'+this.userData.userId;

    this.states = [
      {id:1,val:'Andhra Pradesh',isChecked:false},
      {id:2,val:'Arunachal Pradesh',isChecked:false},
      {id:3,val:'Assam',isChecked:false},
      {id:4,val:'Bihar',isChecked:false},
      {id:5,val:'Chattisgarh',isChecked:false},
      {id:6,val:'Goa',isChecked:false},
      {id:7,val:'Gujarat',isChecked:false},
      {id:8,val:'Haryana',isChecked:false},
      {id:9,val:'Himachal Pradesh',isChecked:false},
      {id:10,val:'Jharkhand',isChecked:false},
      {id:11,val:'Karnataka',isChecked:false},
      {id:12,val:'Kerala',isChecked:false},
      {id:13,val:'Madhya Pradesh',isChecked:false},
      {id:14,val:'Maharashtra',isChecked:false},
      {id:15,val:'Manipur',isChecked:false},
      {id:16,val:'Meghalaya',isChecked:false},
      {id:17,val:'Mizoram',isChecked:false},
      {id:18,val:'Nagaland',isChecked:false},
      {id:19,val:'Odisha',isChecked:false},
      {id:20,val:'Punjab',isChecked:false},
      {id:21,val:'Rajasthan',isChecked:false},
      {id:22,val:'Sikkim',isChecked:false},
      {id:23,val:'Tamil Nadu',isChecked:false},
      {id:24,val:'Telangana',isChecked:false},
      {id:25,val:'Tripura',isChecked:false},
      {id:26,val:'Uttarakhand',isChecked:false},
      {id:27,val:'Uttar Pradesh',isChecked:false},
      {id:28,val:'West Bengal',isChecked:false},
      {id:30,val:'Andaman and Nicobar Islands',isChecked:false},
    {id:31,val:'Dadra and Nagar Haveli and Daman & Diu',isChecked:false},
    {id:32,val:'Jammu & Kashmir',isChecked:false},
    {id:33,val:'Lakshdweep',isChecked:false},
    {id:34,val:'Chandigarh',isChecked:false},
    {id:35,val:'The Government of NCT of Delhi',isChecked:false},
    {id:36,val:'Ladakh',isChecked:false},
    {id:37,val:'Puducherry',isChecked:false},
     
  
    ];
    
   

   }

  ngOnInit() {
    this.loadFilters();
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  async updateFilters(){
    const loading = await this.loadingCtrl.create({
      message:'loading...',
      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    let userDoc = this.afs.firestore.collection(`users`);
  userDoc.get().then((querySnapshot) => { 
   
    
      
   
    querySnapshot.forEach(async (doc) => {
      console.log(doc.id, "=>", doc.data());
      if ((doc.data().deviceId == this.userData.deviceId ) ){
        this.afs.collection('users').doc(this.userData.userId).set({
          'userId': this.userData.userId,
          'name':this.userData.name,
          'email':this.userData.email,
          'createdAt':Date.now(),
          'isAdmin': "false",
          'password':this.userData.password,
          'deviceId':this.userData.deviceId,
          'category':this.category,
          'interests':this.interest,
          'states':this.returningFinalStates(),
          'types':this.types,
          'catId':this.category,
          'interestsId':this.getListSmall(this.interest),
          'typesId':this.getPositive(this.types),
          'statesId':this.finalStatesId

        })





       
      }})}).then(()=>{
        for(let i=0;i<this.interests.length;i++){
          
          FCMPlugin
          .unsubscribeFrom({ topic: this.interests[i].val.split(' ')[0] })
    
        }

      }).
      then(()=>{
        console.log('In Filter: ',this.userinfo);

       
        loading.dismiss();
        this.router.navigateByUrl(`/home/${btoa(this.userinfo)}`);
      })


  }
  async toast(header,message,status){
    const toast = await this.toastr.create({
      header:'LegalAstro',
      message:message,
      position:'top',
      color: status,
      duration:2000
    });
    toast.present();
    

}//end of toast
  getList(val1,val2,val3,val4){
    let i =[];
    i[0] = val1;
    let k=1;
    for(let j=0;j<val2.length;j++){
      i[k] = val2[j].val;
      k++;

    }
    for(let j=0;j<val3.length;j++){
      i[k] = val3[j].val;
      k++;

    }
    for(let j=0;j<val4.length;j++){
      i[k] = val4[j].val;
      k++;

    }
    return i;
  }
  getListSmall(val){
    let k=0;
    let i = [];
    for(let j=0;j<val.length;j++){
      i[k] = val[j].val;
      k++;

    }
    return i;
  }
  getPositive(val){
    let final = [];
    let j =0;
    for(let i=0;i<val.length;i++){
      if(val[i]['isChecked'] == true){
        final[j] = val[i]['val'];
        j++;
      }
    }
    return final;

  }
  interest:any=[];

  loadFilters(){
    this.interests = [
      {id:1,val:'GST',isChecked:false},
      {id:2,val:'Income Tax',isChecked:false},
      {id:3,val:'IBBI',isChecked:false},
  
      {id:4,val:'SEBI',isChecked:false},
      {id:5,val:'Company Law',isChecked:false},
  
      {id:6,val:'LLP',isChecked:false},
      {id:7,val:'Labour Laws',isChecked:false},

      {id:8,val:'RBI',isChecked:false},
      {id:9,val:'MCA',isChecked:false},
      {id:10,val:'Foreign Trade',isChecked:false},
  
      {id:11,val:'ICAI',isChecked:false},
      {id:12,val:'DGFT',isChecked:false},
  
      {id:13,val:'FSSAI',isChecked:false},
      {id:14,val:'Commerce',isChecked:false},
      {id:15,val:'ICMAI',isChecked:false},
      {id:16,val:'NSDL',isChecked:false},
  
      {id:17,val:'NCLAT',isChecked:false},
      {id:18,val:'CBIC',isChecked:false},
  
  
    ];
    let userDoc = this.afs.firestore.collection(`users`);
    userDoc.get().then((querySnapshot) => { 
     
      
        
     
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id, "=>", doc.data());
        if ((doc.data().deviceId == this.userData.deviceId ) ){
          if(doc.data().interests){
          this.interest = doc.data().interests;
        console.log('Types: ',this.types);
        console.log('Interests: ',this.interests);
          }
          else{
            this.interests = [
              {id:1,val:'GST',isChecked:false},
              {id:2,val:'Income Tax',isChecked:false},
              {id:3,val:'IBBI',isChecked:false},
          
              {id:4,val:'SEBI',isChecked:false},
              {id:5,val:'Company Law',isChecked:false},
          
              {id:6,val:'LLP',isChecked:false},
              {id:7,val:'Labour Laws',isChecked:false},

              {id:8,val:'RBI',isChecked:false},
              {id:9,val:'MCA',isChecked:false},
              {id:10,val:'Foreign Trade',isChecked:false},
          
              {id:11,val:'ICAI',isChecked:false},
              {id:12,val:'DGFT',isChecked:false},
          
              {id:13,val:'FSSAI',isChecked:false},
              {id:14,val:'Commerce',isChecked:false},
              {id:15,val:'ICMAI',isChecked:false},
              {id:16,val:'NSDL',isChecked:false},
          
              {id:17,val:'NCLAT',isChecked:false},
              {id:18,val:'CBIC',isChecked:false},
          
          
            ];}
            if(doc.data().types){
              this.types = doc.data().types;

            }
            else{
              this.types = [
                {val:'Government Notifications',isChecked:true},
                {val:'Website and Functional Updates',isChecked:true},
                {val:'News',isChecked:true},
                {val:'Notice',isChecked:true},
                {val:'Circular',isChecked:true},

              ];
            }
            if(doc.data().category){
              this.category = doc.data().category;

            }
           if(doc.data().states){
            this.port = doc.data().states;

           }
          
           
            
    
          

      }
     
        })})

  }
  routerHome(){
    this.router.navigateByUrl(`/home/${btoa(this.userinfo)}`)
  }
  k = 0;
  selectAll(data){
    if( this.k %2 == 0){
      for(let i=0;i<data.length;i++){
        data[i]['isChecked'] = true;
      }
      this.k++;

    }
    else{
      for(let i=0;i<data.length;i++){
        data[i]['isChecked'] = false;
      }
      this.k++;

    }

   

  }
  l = 0
  isAll=false;
  selectingAllStates(){
    if( this.l %2 == 0){
      this.isAll =true;

      this.l++;

    }
    else{
      this.isAll = false;

     
      this.l++;

    }
  }
  finalStatesId=[];
  returningFinalStates(){
    if(this.isAll){
      this.finalStatesId = this.getListSmall(this.states)
      return this.states
    }
    else{
      this.finalStatesId = this.getListSmall(this.states)

      return this.states
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  slideOpts = {
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
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
  
}
