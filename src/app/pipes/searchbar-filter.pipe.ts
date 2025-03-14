import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchbarFilter',
  standalone: true
})
export class SearchbarFilterPipe implements PipeTransform {

  transform(exercises: any[], searchText: string): any[] {
    if (!exercises) return [];
    if (!searchText) return exercises;

    searchText = searchText.toLowerCase();
    return exercises.filter(exercise => exercise.name.toLowerCase().includes(searchText));
  }

}
