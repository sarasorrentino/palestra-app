import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManualPageRoutingModule } from './manual-routing.module';

import { ManualPage } from './manual.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SearchbarFilterPipe } from 'src/app/pipes/searchbar-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualPageRoutingModule,
    HeaderComponent,
    SearchbarFilterPipe
  ],
  declarations: [ManualPage]
})
export class ManualPageModule {}
