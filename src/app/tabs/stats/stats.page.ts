import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { StatsStorageService } from 'src/app/services/stats-storage.service';
import { WorkoutStorageService } from 'src/app/services/workout-storage.service';

Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: false,
})
export class StatsPage implements OnInit, AfterViewInit, OnDestroy {

  totalWorkoutTime: string = '';
  totalWorkoutNumber: number = 0;

  @ViewChild('workoutHistoryChart') workoutHistoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('exerciseLoadsChart') exerciseLoadsChartRef!: ElementRef<HTMLCanvasElement>;
  
  workoutHistoryChart!: Chart | null;
  exerciseLoadsChart!: Chart | null;

  exerciseDB: any = '[]';

  workoutHistoryData = this.statsStorage.getWorkoutHistoryData();

  selectedExerciseName = 'Bench Press';
  exerciseNames = this.getExercisesName();
  userRecords: any = '';

  constructor(private statsStorage: StatsStorageService, private workoutStorage: WorkoutStorageService, private router: Router){}

  ngOnInit() {
    this.totalWorkoutTime = this.workoutStorage.convertSecondsToHoursMinutes();
    this.totalWorkoutNumber = this.workoutHistoryData.length;
    this.userRecords = this.statsStorage.getRecords();
    this.exerciseDB = JSON.parse(localStorage.getItem('exercisesDB') || '[]');
  }

  ngAfterViewInit() {
    this.createWorkoutDurationChart();
    this.createExerciseLoadsChart();
  }

  ngOnDestroy() {
    if (this.workoutHistoryChart) this.workoutHistoryChart.destroy();
    if(this.exerciseLoadsChart) this.exerciseLoadsChart.destroy(); 
  }

  createWorkoutDurationChart() {
    if (this.workoutHistoryChart) {
      this.workoutHistoryChart.destroy();
    }

    const ctx = this.workoutHistoryChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.workoutHistoryData.map((entryData: any) => entryData.date);
    const durations = this.workoutHistoryData.map((entryData: any) => entryData.duration);

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Workout Duration',
          data: durations,
          backgroundColor: 'rgba(179, 228, 41, 0.20)',
          borderColor: '#B3E429',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            title: { display: false}
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            title: {
              display: true,
              text: 'Duration (min)',
              color: '#f7f7f7',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            beginAtZero: true
          }
        }
      }
    };

    this.workoutHistoryChart = new Chart(ctx, config);
  }

  createExerciseLoadsChart() {
    if (this.exerciseLoadsChart) {
      this.exerciseLoadsChart.destroy();
    }

    const ctx = this.exerciseLoadsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    let exerciseId = this.getExerciseId();
    let loads = this.userRecords.find((r: any) => r.id === exerciseId).loads || 0;
    let dates = this.userRecords.find((r: any) => r.id === exerciseId).dates || 0;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Load (kg)',
          data: loads,
          borderColor: '#B3E429',
          backgroundColor: 'rgba(179,228, 41, 0.2)',
          borderWidth: 2,
          tension: 0.3,
          pointBackgroundColor: 'rgba(178, 228, 41, 0.6)',
          pointRadius: 5,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            title: { display: false }
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.2)' },
            max: Math.max(...loads) + 5,
            title: {
              display: true,
              text: 'Weight (kg)',
              color: '#f7f7f7',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            beginAtZero: true
          }
        }
      }
    };

    this.exerciseLoadsChart = new Chart(ctx, config);
  }
  
  onExerciseChange() {
    console.log(this.selectedExerciseName);
    this.createExerciseLoadsChart();
  }
  
  backToHome(){
    this.router.navigate(['/tabs/home']);
  }

  getExercisesName() {
    let allExercises = JSON.parse(localStorage.getItem('exercisesDB') || '[]');
    let namesToString: any[string] = [];
    for(let i = 0; i < allExercises.length; i++){
      namesToString.push(allExercises[i].name);
    }
    return namesToString;
  }

  getExerciseId() {
    return this.exerciseDB.find((r: any) => r.name === this.selectedExerciseName).id || 0 ;
  }
}
