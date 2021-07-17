import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DynamicPageRoutingModule } from './dynamic-routing.module';

import { DynamicPage } from './dynamic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicPageRoutingModule
  ],
  declarations: [DynamicPage]
})
export class DynamicPageModule {}
