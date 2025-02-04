import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-name-header',
  templateUrl: './name-header.component.html',
  styleUrls: ['./name-header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NameHeaderComponent implements OnInit {

  constructor(private router: Router, private alertController: AlertController){}

  @Input() currentUser: string = '';

  ngOnInit() {
    const name = localStorage.getItem('currentUser');
    if (name) {
      this.currentUser = name;
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
          cssClass: 'secondary'
        },
        {
          text: 'Confirm',
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