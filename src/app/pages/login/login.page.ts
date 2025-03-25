import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private userStorage: UserStorageService) { }

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

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  validatePassword() {
    this.passwordError = '';
    this.passwordValid = false;

    if (!this.user.password) {
      this.passwordError = 'Password is required';
    } else if (this.user.password.length < 6) {
      this.passwordError = 'Password must be at least 6 characters long';
    }
    else {
      this.passwordValid = true;
    }
  }

  /*----------------------------------------------------------------------------------------------------
    Credentials verification
  ----------------------------------------------------------------------------------------------------*/

  async verifyCredentials() {
    const user = await this.userStorage.getUserByEmail(this.user.email);
    if (user && user.password === this.user.password) {
      this.userStorage.updateCurrentUser(this.user.email); // Update current user
      this.router.navigate(['tabs/home']);
    } 
    else {
      this.emailError = '';
      this.passwordError = '';
      this.passwordError = "Invalid email or password";
    }
  }

  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  register(){
    this.router.navigate(['register']);
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

}
