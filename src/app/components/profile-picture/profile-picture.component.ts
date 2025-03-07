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

  profileImage: string | null = null; // Per memorizzare l'immagine profilo

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private userStorage: UserStorageService) {}

  ngOnInit() {
    this.loadProfileImage(); // Carica l'immagine salvata quando l'utente accede
  }
  
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

  selectImage() {
    console.log('Immagine cliccata, ora seleziono il file...');
    this.fileInput.nativeElement.click(); // Attiva l'input file
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('Immagine caricata nel reader');
  
        // Recupera la lista di immagini salvate o inizializza un array vuoto
        let imagesData = localStorage.getItem('profile_images') || '[]';
        let images = JSON.parse(imagesData);
  
        // Controlla se l'utente esiste già nella lista
        const existingUserIndex = images.findIndex((user: any) => user.uid === this.userStorage.getCurrentUserId());
  
        if (existingUserIndex !== -1) {
          // Se l'utente esiste, aggiorna la sua immagine
          images[existingUserIndex].string_image = e.target.result;
        } else {
          // Se l'utente non esiste, aggiungi un nuovo oggetto
          images.push({ uid: this.userStorage.getCurrentUserId(), string_image: e.target.result });
        }
  
        // Salva l'array aggiornato in localStorage sotto `profile_images`
        localStorage.setItem('profile_images', JSON.stringify(images));
  
        // Aggiorna l'immagine profilo per la visualizzazione
        this.profileImage = e.target.result as string;
      };
      reader.readAsDataURL(file); // Converte l'immagine in Base64
    } else {
      console.log('Nessun file selezionato');
    }
  }
  

}
