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
  selectedDay: number = this.planStorage.getSelectedDay();
  totalDays: number = 3;
  totalExercises: number = 0;
  trainingDays: any = [];
  isCardVisible = false;

  openCard() {
    this.planStorage.setCardVisibilityStatus(true);
    this.renderer.addClass(document.body, 'tab-bar-hidden'); // Hide tab bar
  }
  
  closeCard() {
    this.planStorage.setCardVisibilityStatus(false);
    this.renderer.removeClass(document.body, 'tab-bar-hidden'); // Show tab bar
  }

  ngOnInit() {
    this.updatePlan();
    this.updateCurrentPlan();

    this.planStorage.cardVisibility$.subscribe(value => {
      this.isCardVisible = value;
    });
  }

  ionViewWillEnter() {
    this.updateCurrentPlan();
    this.selectedDay = this.planStorage.getSelectedDay();
  }

  updateCurrentPlan() {
    this.currentPlan = '';
    let userPlans = this.planStorage.getCurrentUserPlans();
    for(let i = 0; i < userPlans.length; i++) {
      if (userPlans[i].isCurrent) {
        this.planStorage.updateCurrentPlan(userPlans[i]);
      }
    }
  }

  updatePlan(){
    this.planStorage.currentPlan$.subscribe(plan => {
      if(plan){
        this.currentPlan = plan;
        //console.log("current plan");
        //console.log(this.currentPlan);
        this.totalDays = this.currentPlan.n_days;
        //console.log("n days");
        //console.log(this.totalDays);
        this.selectedDay = this.planStorage.getSelectedDay();
        this.totalExercises = this.currentPlan.days[this.selectedDay].length;
        //console.log("n esercizi");
        //console.log(this.totalExercises);
      }

      // Select day alert
      this.trainingDays = Array.from({ length: this.totalDays}, (_, index) => ({
        type: 'radio',
        label: `Day ${index + 1}`,
        value: index,
        checked: index === this.planStorage.getSelectedDay()
      }));

    });
  }

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

  checkDayValidity() {
    if(this.totalExercises === 0)
      return false;
    return true;
  }

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

  navToNewPlan() {
    this.planStorage.setCardVisibilityStatus(true);
    this.router.navigate(['/tabs/plans']);
  }

  navToProfile() {
    this.router.navigate(['/tabs/profile']);
  }

  navToWorkout() {
    //this.router.navigate(['/countdown']);
    this.router.navigateByUrl('/countdown', { replaceUrl: true });
  }

}
