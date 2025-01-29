import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/app-storage.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService, private localStorage: LocalStorageService) { }

  ngOnInit() { }

  user = {
    email: "",
    password: ""
  };

  emailError: string = "";
  passwordError: string = "";
  emailValid: boolean = false;
  passwordValid: boolean = false;

  async saveCredentials() {
    const existingUser = await this.localStorage.getUser(this.user.email);
    if (existingUser) {
      this.passwordError = "Email already in use";
      return;
    }

    const newUser = { username: this.user.email, password: this.user.password };
    this.localStorage.setUser(newUser);
    this.router.navigate(['profile-data']);
  }

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

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  login(){
    this.router.navigate(['login']);
  }

}
