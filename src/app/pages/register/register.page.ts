import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/

  emailError: string = "";
  emailValid: boolean = false;

  passwordError: string = "";
  passwordValid: boolean = false;

  user = {
    email: "",
    password: ""
  };

  /*----------------------------------------------------------------------------------------------------
    Credentials verification
  ----------------------------------------------------------------------------------------------------*/

  async chackCredentials() {
    const existingUser = await this.localStorage.getUser(this.user);
    if (existingUser) {
      this.passwordError = "Email already in use";
      return;
    }

    this.localStorage.user.email = this.user.email; // Temporary save credentials before saving in profile-data page
    this.localStorage.user.password = this.user.password; // Temporary save credentials before saving in profile-data page
    this.router.navigate(['profile-data']);
  }

  /*----------------------------------------------------------------------------------------------------
    Input validation
  ----------------------------------------------------------------------------------------------------*/

  validateEmail() {
    this.emailError = '';
    this.emailValid = false;

    if (!this.user.email) {
      this.emailError = 'Email is required';
    } else if (!this.isValidEmail(this.user.email)) {
      this.emailError = 'Invalid email';
    }
    else {
      this.emailValid = true;
    }
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

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  login(){
    this.router.navigate(['login']);
  }

}
