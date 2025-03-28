import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.page.html',
  styleUrls: ['./manual.page.scss'],
  standalone: false,
})
export class ManualPage implements OnInit {

  exercises: any[] = [];
  favoriteExercises: any[] = [];
  userExercises: any[] = [];
  viewFavorites: boolean = false;

  searchText: string = '';

  constructor(private http: HttpClient, private userStorage: UserStorageService) { }

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercises = data;
    });

    // When user changes...
    this.userStorage.getCurrentObservableUser().subscribe(user => {
      this.favoriteExercises = JSON.parse(localStorage.getItem('favorite_exercises') || '[]');
      const userFavorites = this.favoriteExercises.find((f: any) => f.uid === this.userStorage.getCurrentUserId());
      this.userExercises = userFavorites ? userFavorites.exercises : [];
      //console.log(this.userExercises);
      this.viewFavorites = JSON.parse(localStorage.getItem('viewFavorites') || 'false');
    }); 

  }

  ionViewWillEnter() {
    this.viewFavorites=JSON.parse(localStorage.getItem('viewFavorites') || 'false');
  }

  toggleFavorite(exercise: any) {
    const index = this.userExercises.findIndex(e => e.name === exercise.name);

    if(index < 0) {
      // Add exercise to user list
      this.userExercises.push(exercise);
    }
    else {
      // Remove exercise from user list
      let updatedList: any = [];
      for(let i = 0; i < this.userExercises.length; i++){
        if(this.userExercises[i].name !== exercise.name){
          updatedList.push(this.userExercises[i]);
        }
      }
      this.userExercises = updatedList;
    }
    
    const userIndex = this.favoriteExercises.findIndex((f: any) => f.uid === this.userStorage.getCurrentUserId());
    if(userIndex > -1){
      this.favoriteExercises[userIndex] = {uid: this.userStorage.getCurrentUserId(), exercises: this.userExercises};
    }
    else {
      this.favoriteExercises.push({uid: this.userStorage.getCurrentUserId(), exercises: this.userExercises});
    }
    localStorage.setItem('favorite_exercises', JSON.stringify(this.favoriteExercises));
  }

  isFavorite(exercise: any): boolean {
    return this.userExercises.some(e => e.name === exercise.name);
  }

  toggleFavoritesView(){
    this.viewFavorites = !this.viewFavorites;
    localStorage.setItem('viewFavorites', JSON.stringify(this.viewFavorites));
  }

}