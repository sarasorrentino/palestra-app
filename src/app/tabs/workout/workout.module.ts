import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutPageRoutingModule } from './workout-routing.module';

import { WorkoutPage } from './workout.page';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { CountdownComponent } from 'src/app/components/countdown/countdown.component';
import { RestTimeComponent } from 'src/app/components/rest-time/rest-time.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { WorkoutHeaderComponent } from 'src/app/components/workout-header/workout-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutPageRoutingModule,
    TimerComponent,
    CountdownComponent,
    RestTimeComponent,
    WorkoutHeaderComponent
  ],
  declarations: [WorkoutPage]
})
export class WorkoutPageModule {}
