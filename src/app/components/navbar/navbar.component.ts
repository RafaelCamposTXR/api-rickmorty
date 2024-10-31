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
  // Usando @Select para obter a lista de favoritos como um Observable
  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;

  favoriteCount: number = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Inscreve-se no Observable para contar favoritos
    this.favorites$.subscribe(favorites => {
      this.favoriteCount = favorites.length;
    });
  }


}
