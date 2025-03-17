import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanPageRoutingModule } from './plan-routing.module';

import { PlanPage } from './plan.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AddExerciseComponent } from 'src/app/components/add-exercise/add-exercise.component';
import { NewExerciseCardComponent } from 'src/app/components/new-exercise-card/new-exercise-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanPageRoutingModule,
    HeaderComponent,
    AddExerciseComponent,
    NewExerciseCardComponent
  ],
  declarations: [PlanPage]
})
export class PlanPageModule {}
