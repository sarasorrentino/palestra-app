import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlansPageRoutingModule } from './plans-routing.module';

import { PlansPage } from './plans.page';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlansPageRoutingModule,
    HeaderComponent
  ],
  declarations: [PlansPage]
})
export class PlansPageModule {}
