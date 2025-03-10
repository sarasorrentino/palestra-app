import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsStorageService } from 'src/app/services/stats-storage.service';
import { WorkoutStorageService } from 'src/app/services/workout-storage.service';

Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: false,
})
export class StatsPage implements OnInit {

  constructor(private statsStorage: StatsStorageService, private workoutStorage: WorkoutStorageService){}

  @ViewChild('workoutHistoryChart', { static: true }) workoutHistoryChartRef!: ElementRef;
  workoutHistoryChart: any;

  workoutHistoryData = this.statsStorage.getWorkoutHistoryData();

  totalWorkoutTime: string = '';
  totalWorkoutNumber: number = 0;

  ngOnInit() {
    this.totalWorkoutTime = this.workoutStorage.convertSecondsToHoursMinutes();
    this.totalWorkoutNumber = this.workoutHistoryData.length;
  }

  ngAfterViewInit() {
    const container = document.querySelector('.chart-container');
    if (container) {
      container.scrollLeft = container.scrollWidth;
    }
    const labels = this.workoutHistoryData.map((entry: any) => entry.date);
    const durations = this.workoutHistoryData.map((entry: any) => entry.duration);

    const ctx = this.workoutHistoryChartRef.nativeElement.getContext('2d');
    this.statsStorage.createWorkoutDurationChart(ctx, labels, durations, 'Workout History');
  
  }
  
}
