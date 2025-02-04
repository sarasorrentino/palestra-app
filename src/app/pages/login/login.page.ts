import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() { }

  user = {
    email: "",
    password: ""
  };

  errorMessage: string = "";

  async verifyCredentials() {
    const user = await this.localStorage.getUser(this.user);
    if (user && user.password === this.user.password) {
      console.log("Login riuscito!");
      localStorage.setItem('currentUser', user.name);
      this.router.navigate(['tabs/home']);
    } 
    else {
      this.emailError = '';
      this.passwordError = '';
      this.passwordError = "Incorrect Email or password";
    }
  }

  emailError: string = "";
  passwordError: string = "";
  emailValid: boolean = false;
  passwordValid: boolean = false;

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
    //console.log('Email: ' + this.emailValid);
    //console.log('Password: ' + this.passwordValid);
    //console.log(!this.emailValid && !this.passwordValid);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
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
    //console.log('Email: ' + this.emailValid);
    //console.log('Password: ' + this.passwordValid);
    //console.log(!this.emailValid && !this.passwordValid);
  }

  register(){
    this.router.navigate(['register']);
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

}
