import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutPageRoutingModule } from './workout-routing.module';

import { WorkoutPage } from './workout.page';
import { TimerComponent } from 'src/app/components/timer/timer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutPageRoutingModule,
    TimerComponent
  ],
  declarations: [WorkoutPage]
})
export class WorkoutPageModule {}
