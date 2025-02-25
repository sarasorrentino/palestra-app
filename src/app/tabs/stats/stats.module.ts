import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsPageRoutingModule } from './stats-routing.module';

import { StatsPage } from './stats.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ExerciseLoadChartComponent } from 'src/app/components/exercise-load-chart/exercise-load-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsPageRoutingModule,
    HeaderComponent,
    ExerciseLoadChartComponent
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
