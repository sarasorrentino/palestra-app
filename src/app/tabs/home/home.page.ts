import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService, private planStorage: PlansStorageService) { }

  currentPlan: any;
  
  ngOnInit() {
    this.planStorage.currentPlan$.subscribe(plan => {
      if(plan)
        this.currentPlan = plan;
    });
  }

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
    this.router.navigate(["/tabs/plans/new-plan"]);
  }

  navToPlan() {
    this.planStorage.setSelectedPlan(this.planStorage.getCurrentPlanID());
    console.log(this.planStorage.getSelectedPlan().uid);
    this.router.navigate(['/tabs/plans/plan']);
  }

  navToProfile() {
    this.router.navigate(['/tabs/profile']);
  }

  navToWorkout() {
    console.log("Workout");
  }

}
