import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly FAVORITE_KEY = 'favoriteCount'; 
  private favoriteCountSubject: BehaviorSubject<number>;
  favoriteCount$;

  constructor() {
    const storedCount = Number(localStorage.getItem(this.FAVORITE_KEY)) || 0;
    this.favoriteCountSubject = new BehaviorSubject<number>(storedCount);
    this.favoriteCount$ = this.favoriteCountSubject.asObservable(); 
  }

  addFavorite() {
    const newCount = this.favoriteCountSubject.value + 1;
    this.favoriteCountSubject.next(newCount);
    localStorage.setItem(this.FAVORITE_KEY, newCount.toString()); 
  }

  removeFavorite() {
    const newCount = this.favoriteCountSubject.value > 0 ? this.favoriteCountSubject.value - 1 : 0;
    this.favoriteCountSubject.next(newCount);
    localStorage.setItem(this.FAVORITE_KEY, newCount.toString()); 
  }

  getFavoriteCount(): number {
    return this.favoriteCountSubject.value;
  }
}
