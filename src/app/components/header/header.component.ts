import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, cogOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private userStorage: UserStorageService, private planStorage: PlansStorageService) {
    addIcons({ logOutOutline, cogOutline });
  }

  @Input() currentUsername: string = '';
  @Input() title: string = '';
  @Input() showIcon: boolean = true;
  
  profileImage: string = '';

  ngOnInit() {
    this.userStorage.getCurrentObservableUser().subscribe(user => {
      this.currentUsername = this.userStorage.getCurrentUser().name;
      this.userStorage.loadProfileImage();
    }); 

    this.userStorage.getProfileImage().subscribe(image => {
      this.profileImage = image;
    });

    this.userStorage.getCurrentObservableUserName().subscribe((name: string) => {
      this.currentUsername = name;
    });

  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Do you want to logout?',
      message: '',
      buttons: [
        {
          text: 'Logout',
          handler: () => {
            this.router.navigate(['welcome']);
            this.userStorage.resetCurrentUser();
            this.planStorage.resetCurrentPlan();
            this.planStorage.resetSelectedPlan();
            //console.log('Logged out');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  navToProfile() {
    this.router.navigate(['/tabs/profile']);
  }

}
