import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-countdown-component',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class CountdownComponent implements OnDestroy{
  countdownNumbers = ['', '3', '2', '1', 'Go!'];
  currentIndex = 0;
  showNumber = '';
  isRunning = false;
  animateClass = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.isRunning = true;
    this.currentIndex = 0;
    this.showNextNumber();
  }

  showNextNumber() {
    if (this.currentIndex < this.countdownNumbers.length) {
      this.showNumber = this.countdownNumbers[this.currentIndex];
      this.animateClass = '';

      setTimeout(() => {
        this.animateClass = 'animate';
        this.currentIndex++;
        setTimeout(() => this.showNextNumber(), 1200);
      }, 10);
    } else {
      this.isRunning = false;
      //this.router.navigate(['/workout']);
      console.log("fineee");
      this.router.navigateByUrl('/workout', { replaceUrl: true })
      .then(success => console.log("Navigazione riuscita:", success))
      .catch(error => console.error("Errore navigazione:", error));
    }
  }

  ngOnDestroy() {
    if (this.currentIndex) {
      clearTimeout(this.currentIndex);
      console.log('Timer cancellato!');
    }
  }
}