import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { PlansUpdateService } from 'src/app/services/plans-update.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
  standalone: false,
})
export class PlansPage implements OnInit {

  plans: any[] = [];

  constructor(private router: Router, private planStorage: PlansStorageService, private userStorage: UserStorageService, private alertController: AlertController) { }

  ngOnInit() {
    this.planStorage.plans$.subscribe(plans => {
      this.plans = plans;
      this.plans = plans.filter((plan: any) => plan.ownerID === this.userStorage.getCurrentUserId());
      console.log(this.plans);
    });
  }

  newPlan(){
    this.router.navigate(["/tabs/plans/new-plan"]);
  }

  toggleCurrent(plan: any, slidingItem: IonItemSliding) {
    const current = this.planStorage.getCurrentPlanID();
    if(current !== plan.uid){
      this.planStorage.setCurrentPlan(plan.uid);
    }
    slidingItem.close();
  }

  selectPlan(planID: number){
    this.planStorage.setSelectedPlan(planID);
    this.router.navigate(['/tabs/plans/plan']);
  }

  async deletePlan(plan: any, slidingItem: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Do you want to delete this plan?',
      message: 'This action is irreversible and you will loose your plan',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.planStorage.removePlan(plan.uid);
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
  
  navToWorkout() {
    this.router.navigate(['/countdown']);
  }
}
