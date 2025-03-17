import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class ProfilePictureComponent  implements OnInit {

  profileImage: string = '';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.userStorage.loadProfileImage();
    this.userStorage.getProfileImage().subscribe(image => {
      this.profileImage = image;
    });
  }

  selectImage() {
    console.log('Choosing file...');
    this.fileInput.nativeElement.click(); // Activate file input
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {  

        let imagesData = localStorage.getItem('profile_images') || '[]';
        let images = JSON.parse(imagesData);
  
        const existingUserIndex = images.findIndex((user: any) => user.uid === this.userStorage.getCurrentUserId());
  
        if (existingUserIndex !== -1) {
          images[existingUserIndex].string_image = e.target.result; // If user exists, update img
        } else {
          images.push({ uid: this.userStorage.getCurrentUserId(), string_image: e.target.result }); // If user does not exist, create new object
        }
  
        localStorage.setItem('profile_images', JSON.stringify(images)); // Update local storage
  
        // Aggiorna l'immagine profilo per la visualizzazione
        this.profileImage = e.target.result as string;
        this.userStorage.loadProfileImage();
      };
      reader.readAsDataURL(file); // Converte l'immagine in Base64
    } else {
      console.log('No file selected');
    }
  }
  

}
