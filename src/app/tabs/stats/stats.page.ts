import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: false,
})
export class StatsPage implements OnInit {

  @ViewChild('workoutChart', { static: true }) workoutChartRef!: ElementRef;
  workoutChart: any;

  // Dati di esempio: date e durata in minuti
  workoutData = [
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

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const dates = this.workoutData.map(item => item.date);
    const durations = this.workoutData.map(item => item.duration);

    this.workoutChart = new Chart(this.workoutChartRef.nativeElement, {
      type: 'bar', // Puoi usare 'bar' per un grafico a barre
      data: {
        labels: dates,
        datasets: [{
          label: 'Workout Duration (min)',
          data: durations,
          backgroundColor: 'rgba(255, 206, 9, 0.2)',
          borderColor:'rgb(255, 206, 9)',
          borderWidth: 2,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        responsive: false, // Disabilita la responsività per usare la larghezza fissa
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Duration (minutes)'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  ngAfterViewInit() {
    const container = document.querySelector('.chart-container');
    if (container) {
      container.scrollLeft = container.scrollWidth; // Scorri fino alla fine
    }
  }
  
}
