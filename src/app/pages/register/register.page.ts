import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.page.form';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/app-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  form!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private storageService: StorageService) { }

  ngOnInit() {
    this.form = new RegisterPageForm(this.formBuilder).createForm();
  }

  login(){
    this.router.navigate(['login']);
  }

  continue(){
    this.router.navigate(['profile-data']);
  }

  async saveLoginData() {

    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    // Salva i dati nel Local Storage
    await this.storageService.set('email', { email });
    await this.storageService.set('password', { password });
    console.log('Email and password saved:', { email, password });
    this.continue();
    
  }

}
