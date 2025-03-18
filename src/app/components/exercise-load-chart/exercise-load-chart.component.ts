import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js';
import { StatsStorageService } from 'src/app/services/stats-storage.service';

@Component({
  selector: 'app-exercise-load-chart',
  templateUrl: './exercise-load-chart.component.html',
  styleUrls: ['./exercise-load-chart.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExerciseLoadChartComponent implements AfterViewInit {
  @ViewChild('loadChart') loadChartRef!: ElementRef;

  exercises = this.statsStorage.getRecords().exerciseLoads;

  selectedExercise = this.exercises[0];
  chart!: Chart;

  constructor(private statsStorage: StatsStorageService) {}

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Distruggi il grafico esistente prima di crearne uno nuovo
    }

    const ctx = this.loadChartRef.nativeElement.getContext('2d');
    this.chart = this.statsStorage.createExerciseLoadChart(
      ctx,
      this.selectedExercise.name,
      this.selectedExercise.loads,
      this.selectedExercise.dates
    );
  }

  onExerciseChange(): void {
    this.renderChart();
  }
}