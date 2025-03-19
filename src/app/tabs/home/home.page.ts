import { Component, OnInit, Renderer2 } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
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

  constructor(private router: Router, private planStorage: PlansStorageService, private navCtrl: NavController, private renderer: Renderer2) { }

  currentPlan: any;
  selectedDay: number = 2;
  totalDays: number = 3;
  totalExercises: number = 0;

  isCardVisible = false;

  openCard() {
    this.isCardVisible = true;
    this.renderer.addClass(document.body, 'tab-bar-hidden'); // Nasconde la tab bar
  }
  
  closeCard() {
    this.isCardVisible = false;
    this.renderer.removeClass(document.body, 'tab-bar-hidden'); // Mostra la tab bar
  }

  ngOnInit() {
    this.updatePlan();
  }

  updatePlan(){
    this.planStorage.currentPlan$.subscribe(plan => {
      if(plan){
        this.currentPlan = plan;
        console.log("current plan");
        console.log(this.currentPlan);
        this.totalDays = this.currentPlan.n_days;
        console.log("n days");
        console.log(this.totalDays);
        this.selectedDay = this.planStorage.getSelectedDay();
        console.log("selected day");
        console.log(this.selectedDay);
        this.totalExercises = this.currentPlan.days[this.selectedDay].length;
        console.log("n esercizi");
        console.log(this.totalExercises);
      }
    });
  }

  // Select day alert
  trainingDays = Array.from({ length: this.totalDays}, (_, index) => ({
    type: 'radio',
    label: `Day ${index + 1}`,
    value: index,
    checked: index === this.planStorage.getSelectedDay()
  }));

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm',
      handler: (data: any) => {
        this.planStorage.setSelectedDay(data);
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
    localStorage.setItem('viewFavorites', JSON.stringify(true));
    this.router.navigate(['/tabs/manual']);
  }

  createProgram() {
    this.router.navigate(["/tabs/plans/new-plan"]);
  }

  navToPlan() {
    this.planStorage.setSelectedPlan(this.planStorage.getCurrentPlanID());
    //console.log(this.planStorage.getSelectedPlan().uid);
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
