import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesState, AddFavorite, RemoveFavorite, Character } from '../../store/favorites.state';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.favorites$.subscribe(favorites => {
      console.log('Favoritos carregados:', favorites);
    });
  }

  toggleFavorite(characterId: number): void {
    const characterData = this.store.selectSnapshot(FavoritesState.getFavorites).find(character => character.id === characterId);

    if (characterData) {
      this.store.dispatch(new RemoveFavorite(characterId));
      console.log(`Removed from favorites: ${characterId}`);
    } else {
      const newCharacter: Character = {
        id: characterId,
        name: 'Character Name',
        species: 'Character Species',
        type: 'Character Type',
        image: 'Character Image URL'
      };
      this.store.dispatch(new AddFavorite(newCharacter));
      console.log(`Added to favorites: ${characterId}`);
    }


    this.store.select(FavoritesState.getFavorites).subscribe(favorites => {
      console.log('Current favorites:', favorites);
    });
  }
}
