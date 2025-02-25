import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsStorageService } from 'src/app/services/stats-storage.service';

Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: false,
})
export class StatsPage implements OnInit {

  constructor(private statsStorage: StatsStorageService){}

  @ViewChild('workoutHistoryChart', { static: true }) workoutHistoryChartRef!: ElementRef;
  workoutHistoryChart: any;

  // Dati di esempio: date e durata in minuti
  workoutHistoryData = [
    { date: '2025-02-20', duration: 45 },
    { date: '2025-02-21', duration: 30 },
    { date: '2025-02-22', duration: 60 },
    { date: '2025-02-23', duration: 25 },
    { date: '2025-02-24', duration: 50 },
    { date: '2025-03-20', duration: 45 },
    { date: '2025-03-21', duration: 30 },
    { date: '2025-03-22', duration: 60 },
    { date: '2025-03-23', duration: 25 },
    { date: '2025-03-24', duration: 50 }
  ];

  ngOnInit() { }

  ngAfterViewInit() {
    const container = document.querySelector('.chart-container');
    if (container) {
      container.scrollLeft = container.scrollWidth; // Scorri fino alla fine
    }
    const labels = ['2025-02-20', '2025-02-21', '2025-02-22', '2025-02-23', '2025-02-24'];
    const durations = [30, 45, 50, 40, 60];

    const ctx = this.workoutHistoryChartRef.nativeElement.getContext('2d');
    this.statsStorage.createWorkoutDurationChart(ctx, labels, durations, 'Workout History');
  
  }
  
}
