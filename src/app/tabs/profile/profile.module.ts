import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { GenericHeaderComponent } from 'src/app/components/generic-header/generic-header.component';
import { ProfileInputComponent } from 'src/app/components/profile-input/profile-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    GenericHeaderComponent,
    ProfileInputComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
