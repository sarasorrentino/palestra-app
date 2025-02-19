import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
  standalone: false,
})
export class ProfileDataPage implements OnInit {

  constructor(private router: Router, private userStorage: UserStorageService) { }

  ngOnInit() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/
  user = {
    uid: this.userStorage.user.uid,
    email: this.userStorage.user.email,
    password:  this.userStorage.user.password,
    name: "",
    surname: "",
    gender: "",
    weight: "",
    birthDate: "",
    goal: ""
  };

  currentValue = '';

  /*----------------------------------------------------------------------------------------------------
    Input validation
  ----------------------------------------------------------------------------------------------------*/
  isFormValid(): boolean {
    console.log(this.user);
    return !!(
      this.user.name &&
      this.user.surname &&
      this.user.gender &&
      this.user.birthDate &&
      this.user.weight &&
      this.user.goal
    );
  }

  /*----------------------------------------------------------------------------------------------------
    Registration
  ----------------------------------------------------------------------------------------------------*/

  register() {
    this.userStorage.addUser(this.user); // Add user to the users list
    this.userStorage.setCurrentUser(this.user.uid); // Update current user
    this.login();
  }

  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  back () {
    this.router.navigate(['register']);
  }

  login () {
    this.router.navigate(['tabs/home']);
  }

}
