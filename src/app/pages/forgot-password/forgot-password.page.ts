import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage implements OnInit {

  constructor(private router: Router, private userStorage: UserStorageService,private alertController: AlertController) { }

  ngOnInit() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/
  user = {
    email: "",
    password: ""
  };

  emailError: string = "";
  emailValid: boolean = false;

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

  /*----------------------------------------------------------------------------------------------------
    Credentials verification
  ----------------------------------------------------------------------------------------------------*/
  
  async verifyCredentials() {
    const user = await this.userStorage.getUser(this.user);
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

  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  send() {
    this.router.navigate(['login']);
    console.log("Email sent");
  }

  back(){
    this.router.navigate(['login']);
  }
  
}
