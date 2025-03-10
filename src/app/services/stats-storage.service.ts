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

  getRecordForExercise(exerciseUid: number) {
    const records = this.getRecords() || [];
    let existingExercise = records.find((exercise: any) => exercise.uid === exerciseUid);
    return existingExercise.loads[existingExercise.loads.length-1] || 0; // Return last record or 0
}

  
  getWorkoutHistoryData(){
    return JSON.parse(localStorage.getItem('workoutHistoryData') || '[]');
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
          backgroundColor: 'rgba(179, 228, 41, 0.20)',
          borderColor: '#B3E429',
          borderWidth: 1,
          borderRadius: 0.5
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
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            ticks: {
              color: 'white'
            },
            title: {
              display: false,
              text: 'Date',
              color: '#f7f7f7',
              font: {
                size: 16,
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            ticks: {
              color: 'white'
            },
            max: Math.max(...data) + 5,
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

    return new Chart(ctx, config);
  }

  createExerciseLoadChart(ctx: CanvasRenderingContext2D, exerciseName: string, weights: number[], dates: string[]): Chart {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: `${exerciseName} - Weight (kg)`,
          data: weights,
          borderWidth: 1,
          backgroundColor: 'rgba(179, 228, 41, 0.20)',
          borderColor: '#B3E429',
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
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            ticks: {
              color: 'white'
            },
            title: {
              display: false,
              text: 'Date',
              color: '#f7f7f7',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
            ticks: {
              color: 'white',
            },
            max: Math.max(...weights) + 5,
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

    return new Chart(ctx, config);
  }

}
