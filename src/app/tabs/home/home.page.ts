import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/

  plan = this.localStorage.getCurrentPlan();

  /*----------------------------------------------------------------------------------------------------
    Plan management
  ----------------------------------------------------------------------------------------------------*/



  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  navToPlans() {
    this.router.navigate(['/tabs/plans']);
  }

  navToManual() {
    this.router.navigate(['/tabs/manual']);
  }

  createProgram() {
    console.log("Create program");
  }

  navToPlan() {
    this.router.navigate(['/tabs/plans/plan']);
  }

}
