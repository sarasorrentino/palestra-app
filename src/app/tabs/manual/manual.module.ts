import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualPageRoutingModule } from './manual-routing.module';

import { ManualPage } from './manual.page';
import { GenericHeaderComponent } from 'src/app/components/generic-header/generic-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualPageRoutingModule,
    GenericHeaderComponent
  ],
  declarations: [ManualPage]
})
export class ManualPageModule {}
