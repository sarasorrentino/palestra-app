import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false,
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ionViewWillLeave() {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  }  
  
  ngOnInit() {
    localStorage.setItem('exercisesDB', JSON.stringify([
      {
      "id": 1,
      "name": "Bench Press",
      "muscleGroup": "Chest",
      "description": "A fundamental exercise for developing upper body strength.",
      "image": "assets/images/exercises/bench-press.jpg"
      },
      {
      "id": 2,
      "name": "Squat",
      "muscleGroup": "Legs",
      "description": "A compound movement that targets quads, hamstrings, and glutes.",
      "image": "assets/images/exercises/squat.jpg"
      },
      {
      "id": 3,
      "name": "Deadlift",
      "muscleGroup": "Back",
      "description": "One of the best exercises for full-body strength and power.",
      "image": "assets/images/exercises/deadlift.jpg"
      },
      {
      "id": 4,
      "name": "Pull-Up",
      "muscleGroup": "Back",
      "description": "A great bodyweight exercise to strengthen the upper back and arms.",
      "image": "assets/images/exercises/pull-up.jpg"
      },
      {
      "id": 5,
      "name": "Bicep Curl",
      "muscleGroup": "Arms",
      "description": "An isolation exercise to build and define the biceps.",
      "image": "assets/images/exercises/bicep-curl.jpg"
      },
      {
      "id": 6,
      "name": "Lateral Raise",
      "muscleGroup": "Shoulders",
      "description": "A key exercise for building shoulder width and definition.",
      "image": "assets/images/exercises/lateral-raise.jpg"
      },
      {
      "id": 7,
      "name": "Tricep Dips",
      "muscleGroup": "Arms",
      "description": "A powerful exercise to develop the triceps and upper body strength.",
      "image": "assets/images/exercises/tricep-dips.jpg"
      },
      {
      "id": 8,
      "name": "Plank",
      "muscleGroup": "Core",
      "description": "A core-strengthening exercise that improves endurance and stability.",
      "image": "assets/images/exercises/plank.jpg"
      },
      {
      "id": 9,
      "name": "Leg Press",
      "muscleGroup": "Legs",
      "description": "A machine-based exercise to develop lower body strength.",
      "image": "assets/images/exercises/leg-press.jpg"
      },
      {
      "id": 10,
      "name": "Calf Raise",
      "muscleGroup": "Calves",
      "description": "An effective movement for building strong and defined calves.",
      "image": "assets/images/exercises/calf-raise.jpg"
      }
    ]));
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
