import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { Router } from '@angular/router';

import { StorageService } from '../../services/app-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  login() {
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register']);
  }
  
  async saveCredentials() {
    await this.storageService.set('name', 'Sara');
    this.login();
  }

}
