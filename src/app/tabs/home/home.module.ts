import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { IconButtonComponent } from 'src/app/components/icon-button/icon-button.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { NewPlanCardComponent } from 'src/app/components/new-plan-card/new-plan-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponent,
    IconButtonComponent,
    NewPlanCardComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
