import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlanPageRoutingModule } from './new-plan-routing.module';

import { NewPlanPage } from './new-plan.page';
import { PlanHeaderComponent } from 'src/app/components/plan-header/plan-header.component';
import { NewPlanCardComponent } from 'src/app/components/new-plan-card/new-plan-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPlanPageRoutingModule,
    PlanHeaderComponent,
    NewPlanCardComponent
  ],
  declarations: [NewPlanPage]
})
export class NewPlanPageModule {}
