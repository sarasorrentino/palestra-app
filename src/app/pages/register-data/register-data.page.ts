import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.page.html',
  styleUrls: ['./register-data.page.scss'],
  standalone: false,
})
export class RegisterDataPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(){
    this.router.navigate(['home']);
  }

  back(){
    this.router.navigate(['register']);
  }

}
