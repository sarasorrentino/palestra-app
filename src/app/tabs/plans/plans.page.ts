import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlansUpdateService } from 'src/app/services/plans-update.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
  standalone: false,
})
export class PlansPage implements OnInit {

  plans: any[] = [];
  currentPlan: any[] = [];

  constructor(private router: Router, private localStorage: LocalStorageService, private planService: PlansUpdateService, private alertController: AlertController) { }

  ngOnInit() {
    this.planService.plans$.subscribe(plans => {
      this.plans = plans;
    });
  }

  newPlan(){
    this.router.navigate(["/tabs/plans/new-plan"]);
  }

  toggleCurrent(plan: any, slidingItem: IonItemSliding) {
    //console.log("Plan in entrata: " + plan.title);
    const current = this.localStorage.getCurrentPlan();
    //console.log("Corrente: " + current.title);
    if(current.title !== plan.title){
      plan.isCurrent = true;
      localStorage.setItem('currentPlan', JSON.stringify(plan));
      //console.log("Current plan updated: " + plan);
      this.updateCurrentPlan(plan);
    }
    slidingItem.close();
  }

  updateCurrentPlan(currentPlan: any) {
    this.plans = this.localStorage.getPlans(); // Get current plan list
    this.plans = this.plans.map(plan => ({
      ...plan,
      isCurrent: plan.title === currentPlan.title // Update the list with the new current plan
    }));
    //console.log(this.plans);
  
    this.localStorage.updatePlans(this.plans); // Save the new plan list
    //console.log("Lista aggiornata");
  }

  async deletePlan(planToDelete: any, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete this plan?',
      message: 'This action is irreversible and you will loose your plan',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.plans = this.localStorage.getPlans(); // Get current plan list
            this.plans = this.plans.filter(plan => plan.title !== planToDelete.title); // Update list removing the selected plan
            this.localStorage.updatePlans(this.plans);
          }
        },
        {
          text: 'Keep',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  
    slidingItem.close();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Do you confirm to logout?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.router.navigate(['welcome']);
            console.log('Logged out');
          }
        }
      ]
    });
    await alert.present();
  }
  
}
