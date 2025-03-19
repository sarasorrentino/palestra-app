import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  constructor(private router: Router, private userStorage: UserStorageService) { }
  
    user = this.userStorage.getCurrentUser();
    changedUser = this.userStorage.getCurrentUser();
  
    currentValue = '';
    passwordError: string = "";
    passwordValid: boolean = false;
    
    profileImage: string = '';

    onIonChange(event: CustomEvent) {
      this.currentValue = event.detail.value;
    }
  
    onDidDismiss(event: CustomEvent) {
      console.log('didDismiss', JSON.stringify(event.detail));
    }
  
    ngOnInit() {
      this.userStorage.getCurrentObservableUser().subscribe(user => {
        this.user = this.userStorage.getCurrentUser();
      }); 
  
      this.userStorage.getProfileImage().subscribe(image => {
        this.profileImage = image;
      }); 
    }
  
    back () {
      this.router.navigate(['register']);
    }
  
    isFormValid(): boolean {
      //console.log(this.user);
      return !!(
        this.user.name &&
        this.user.surname &&
        this.user.gender &&
        this.user.birthDate &&
        this.user.weight &&
        this.user.goal
      );
    }
  
    isFormChanged(): boolean {
      //console.log(this.user);
      return JSON.stringify(this.user) !== JSON.stringify(this.changedUser);
    }

    validatePassword() {
      this.passwordError = '';
      this.passwordValid = false;
  
      if (!this.user.password) {
        this.passwordError = 'Password is required.';
      } else if (this.user.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long';
      }
      else {
        this.passwordValid = true;
      }
    }  
  
    updateUser() {
      this.userStorage.updateUser(this.user); // Update users list
      this.userStorage.setCurrentUser(this.user.uid); // Update current user
  
      console.log("Updated user");
    }
  
    reset() {
      this.user = this.userStorage.getCurrentUser();
    }

    // Profile image

    @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  
    selectImage() {
      this.fileInput.nativeElement.click(); // Open file picker
    }
  
    onFileSelected(event: any) {
      const file = event.target.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.profileImage = e.target.result; // Show uploaded image
        };
        reader.readAsDataURL(file);
      }
    }

}
