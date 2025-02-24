import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountdownPageRoutingModule } from './countdown-routing.module';

import { CountdownPage } from './countdown.page';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountdownPageRoutingModule,
    CountdownComponent
  ],
  declarations: [CountdownPage]
})
export class CountdownPageModule {}
