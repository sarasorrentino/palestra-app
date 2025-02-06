import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPageRoutingModule } from './plan-routing.module';

import { PlanPage } from './plan.page';
import { GenericHeaderComponent } from 'src/app/components/generic-header/generic-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPageRoutingModule,
    GenericHeaderComponent
  ],
  declarations: [PlanPage]
})
export class PlanPageModule {}
