import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { PlansStorageService } from './plans-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatsStorageService {

  constructor(private planStorage: PlansStorageService) { }

  getRecords() {
    let records = JSON.parse(localStorage.getItem('records') || '[]');
    return records;
  }

  addRecord(newData: { id: number, name: string; newLoad: number; newDate: string }): void {
    const records = this.getRecords();  
    let existingExercise = records.find((exercise: any) => exercise.uid === newData.id); // Da cambiare con il UID

    if (existingExercise) {
      existingExercise.loads.push(newData.newLoad);
      existingExercise.dates.push(newData.newDate);
    } else {
      const newExercise = {
        uid: newData.id,
        name: newData.name,
        loads: [newData.newLoad],
        dates: [newData.newDate]
      };
      records.push(newExercise);
      localStorage.setItem('records', JSON.stringify(records));
    }
  }
  

  // Chart
  
  createWorkoutDurationChart(ctx: CanvasRenderingContext2D, labels: string[], data: number[], title: string): Chart {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title,
          data: data,
          backgroundColor: 'rgba(255, 206, 9, 0.6)',
          borderColor: 'rgb(255, 206, 9)',
          borderWidth: 1
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
    };

    return new Chart(ctx, config);
  }

  createExerciseLoadChart(ctx: CanvasRenderingContext2D, exerciseName: string, weights: number[], dates: string[]): Chart {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: dates, // Ora usa le date come etichette
        datasets: [{
          label: `${exerciseName} - Weight (kg)`,
          data: weights, // carichi per ciascuna data
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
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
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Weight (kg)'
            },
            beginAtZero: true
          }
        }
      }
    };

    return new Chart(ctx, config);
  }

}
