import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
  standalone: false,
})
export class ManualPage implements OnInit {

  exercises: any[] = [];
  favoriteExercises: any[] = [];
  viewFavorites: any = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercises = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['viewFavorites']) {
        this.viewFavorites = params['viewFavorites'] === 'true'; // Converti il valore in booleano
      }
    });
  }

  toggleFavorite(exercise: any) {
    const index = this.favoriteExercises.findIndex(e => e.name === exercise.name);
    
    if (index > -1) {
      this.favoriteExercises.splice(index, 1); // Remove exercise if already present
    } else {
      this.favoriteExercises.push(exercise); // Add exercise if not already present
    }

    localStorage.setItem('favorites', JSON.stringify(this.favoriteExercises));
  }

  isFavorite(exercise: any): boolean {
    return this.favoriteExercises.some(e => e.name === exercise.name);
  }

  toggleFavoritesView(){
    this.viewFavorites = !this.viewFavorites;
  }
}
