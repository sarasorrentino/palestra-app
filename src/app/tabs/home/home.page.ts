import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToPlans() {
    this.router.navigate(['/tabs/plans']);
  }

  navToManual() {
    this.router.navigate(['/tabs/manual']);
  }

  createProgram() {
    console.log("Create program");
  }

}
