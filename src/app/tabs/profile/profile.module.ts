import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileInputComponent } from 'src/app/components/profile-input/profile-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HeaderComponent,
    ProfileInputComponent
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
