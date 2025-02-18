import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileInputComponent  implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  user = this.localStorage.getCurrentUser();
  changedUser = this.localStorage.getCurrentUser();

  currentValue = '';

  onIonChange(event: CustomEvent) {
    this.currentValue = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
  }

  ngOnInit() {}

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
    console.log(this.user);
    return JSON.stringify(this.user) !== JSON.stringify(this.changedUser);
  }

  updateUser() {

    // Update users list
    this.localStorage.updateUser(this.user);

    // Update current user
    this.localStorage.setCurrentUser(this.user.email);

    console.log("Updated user");
  }

  reset() {
    this.user = this.localStorage.getCurrentUser();
  }

}
