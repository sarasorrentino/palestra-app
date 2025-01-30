import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService, private alertController: AlertController) { }

  ngOnInit() {
  }

  user = {
    email: "",
    password: ""
  };

  emailError: string = "";
  emailValid: boolean = false;

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

  errorMessage: string = "";

  async verifyCredentials() {
    const user = await this.localStorage.getUser(this.user);
    if (user) {
      console.log("Utente trovato!");
      const alert = await this.alertController.create({
        header: 'Email sent',
        message: 'An email with the instructions for passwrd recovery have been sent to your address.',
        buttons: ['Close'],
      });
  
      await alert.present();
      this.send();
    } 
    else {
      this.emailError = '';
      this.emailError = "Email not found"
    }
  }

  alertButtons = ['Close'];

  send() {
    this.router.navigate(['login']);
    console.log("Email sent");
  }


  back(){
    this.router.navigate(['login']);
  }
}
