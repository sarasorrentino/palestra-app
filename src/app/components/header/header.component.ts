import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { addIcons } from 'ionicons';
import { logOutOutline, cogOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private localStorage: LocalStorageService) {
    addIcons({ logOutOutline, cogOutline });
  }

  @Input() currentUsername: string = '';
  @Input() title: string = '';
  @Input() showIcon: boolean = true;

  ngOnInit() {
    const user = this.localStorage.getCurrentUser();
    if (user) {
      this.currentUsername = user.name;
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Do you confirm to logout?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'destructive',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['welcome']);
            console.log('Logged out');
          }
        }
      ]
    });
    await alert.present();
  }
}
