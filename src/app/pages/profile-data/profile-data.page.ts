import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
  standalone: false,
})
export class ProfileDataPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/
  user = {
    email: this.localStorage.user.email,
    password:  this.localStorage.user.password,
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
    this.localStorage.user.name = this.user.name;
    this.localStorage.user.surname = this.user.surname;
    this.localStorage.user.gender = this.user.gender;
    this.localStorage.user.birthDate = this.user.birthDate;
    this.localStorage.user.weight = this.user.weight;
    this.localStorage.user.goal = this.user.goal;

    this.localStorage.setUser(); // Add user to the users list
    this.localStorage.setCurrentUser(this.user.email); // Update current user
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
