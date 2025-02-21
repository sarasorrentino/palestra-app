import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class TimerComponent {
  seconds: number = 60; // Tempo iniziale (es. 60 secondi)
  maxSeconds: number = 60; // Tempo massimo per calcolare la progress bar
  private interval: any;

  // Avvia il timer decrescente
  startTimer() {
    if (this.interval) {
      clearInterval(this.interval); // Evita più timer attivi
    }
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.stopTimer(); // Ferma il timer quando arriva a 0
        this.onTimerEnd(); // Esegui azioni al termine
      }
    }, 1000);
  }

  // Ferma il timer
  stopTimer() {
    clearInterval(this.interval);
  }

  // Resetta il timer
  restartTimer() {
    this.stopTimer();
    this.seconds = this.maxSeconds;
    this.startTimer();
  }

  // Calcola la percentuale di avanzamento decrescente
  getProgress() {
    return (this.seconds / this.maxSeconds) * 100;
  }

  // Azione al termine del timer
  onTimerEnd() {
    console.log("Timer finito!");
    // Puoi aggiungere suono, alert o vibrazione qui
  }
}