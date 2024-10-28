import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor() {}

  addFavorite() {
    this.favoriteCountSubject.next(this.favoriteCountSubject.value + 1);
  }

  removeFavorite() {
    this.favoriteCountSubject.next(this.favoriteCountSubject.value > 0 ? this.favoriteCountSubject.value - 1 : 0);
  }

  getFavoriteCount(): number {
    return this.favoriteCountSubject.value;
  }
}
