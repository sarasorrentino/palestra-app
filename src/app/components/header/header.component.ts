import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline, cogOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private userStorage: UserStorageService) {
    addIcons({ logOutOutline, cogOutline });
  }

  @Input() currentUsername: string = '';
  @Input() title: string = '';
  @Input() showIcon: boolean = true;

  ngOnInit() {
    const user = this.userStorage.getCurrentUser();
    if (user) {
      this.currentUsername = user.name;
    }
    this.loadProfileImage(); // Carica l'immagine al caricamento della pagina

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

  navToProfile() {
    console.log("ciao");
    this.router.navigate(['/tabs/profile']);
  }

  profileImage: string = ''; // Variabile che conterrà l'immagine profilo

  loadProfileImage() {
    let imagesData = localStorage.getItem('profile_images') || '[]';
    let images = JSON.parse(imagesData);

    // Cerca l'immagine associata all'UID dell'utente corrente
    const user = images.find((user: any) => user.uid === this.userStorage.getCurrentUserId());

    if (user) {
      this.profileImage = user.string_image;
    } else {
      this.profileImage = ''; // Se l'utente non ha un'immagine salvata, usa quella di default
    }
  }

}
