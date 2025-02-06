import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-name-header',
  templateUrl: './name-header.component.html',
  styleUrls: ['./name-header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NameHeaderComponent implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private localStorage: LocalStorageService){}

  ngOnInit() {
    const user = this.localStorage.getCurrentUser();
    if (user) {
      this.currentUsername = user.name;
    }
  }

  @Input() currentUsername: string = '';

  async logout() {
    const alert = await this.alertController.create({
      header: 'Do you confirm to logout?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.localStorage.resetCurrentUser();
            this.router.navigate(['welcome']);
            console.log('Logged out');
          }
        }
      ]
    });
    await alert.present();
  }
}