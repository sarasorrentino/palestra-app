import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(private router: Router, private planStorage: PlansStorageService, private navCtrl: NavController) { }

  currentPlan: any;
  selectedDay: number = 2;
  totalDays: number = 4;
  
  ngOnInit() {
    this.updatePlan();
  }

  updatePlan(){
    this.planStorage.currentPlan$.subscribe(plan => {
      if(plan){
        this.currentPlan = plan;
        this.totalDays = this.currentPlan.n_days;
        this.selectedDay = this.planStorage.getSelectedDay();
        //console.log("Aggiornamento...");
        //console.log(this.totalDays);
      }
    });
  }

  trainingDays = Array.from({ length: this.totalDays-1 }, (_, index) => ({
    type: 'radio',
    label: `Day ${index + 1}`,
    value: index,
    checked: index === this.selectedDay
  }));

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm',
      handler: (data: any) => {
        console.log(data);
        localStorage.setItem('selectedDay', data);
        this.updatePlan();
      }
    }
  ];


  /*----------------------------------------------------------------------------------------------------
    Navigation
  ----------------------------------------------------------------------------------------------------*/

  navToPlans() {
    this.router.navigate(['/tabs/plans']);
  }

  navToManual() {
    this.router.navigate(['/tabs/manual'], {
      queryParams: { viewFavorites: true }
    });
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
    //this.router.navigate(['/countdown']);
    this.router.navigateByUrl('/countdown', { replaceUrl: true });
  }

}
