import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { NameHeaderComponent } from 'src/app/components/name-header/name-header.component';
import { IconButtonComponent } from 'src/app/components/icon-button/icon-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NameHeaderComponent,
    IconButtonComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {

  print(){
    console.log("Plans");
  }

}
