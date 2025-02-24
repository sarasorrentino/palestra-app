import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  standalone: false
})
export class SummaryPage implements OnInit {

  selectedPlan: any;
  selectedDay: any
  workoutDuration: any;

  constructor(private planStorage: PlansStorageService, private router: Router) { 
    this.selectedPlan = this.planStorage.getCurrentPlan();
    this.selectedDay = this.planStorage.getSelectedDay()+1;
    this.workoutDuration = localStorage.getItem('duration');
  }

  ngOnInit() {
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.workoutDuration / 60);
    const seconds = this.workoutDuration % 60;
    return `${minutes.toString().padStart(2, '0')} min ${seconds.toString().padStart(2, '0')} sec`;
  }

  navToHome() {
    this.router.navigate(['/tabs/home']);
  }
}
