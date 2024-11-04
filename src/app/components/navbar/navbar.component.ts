import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesState, Character } from '../../store/favorites.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;

  favoriteCount: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favorites$.subscribe(favorites => {
      this.favoriteCount = favorites.length;
    });
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false; 
  }

}
