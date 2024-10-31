import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddFavorite, RemoveFavorite, FavoritesState } from '../../store/favorites.state';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  constructor(private store: Store) { }

  

  ngOnInit(): void {
  }

  toggleFavorite(): void {
    const characterData = {
      id: this.characterId,
      name: this.characterName,
      species: this.characterSubtitle,
      type: this.characterType,
      image: this.characterImage
    };
  
    if (this.isFavorite) {
      this.store.dispatch(new RemoveFavorite(this.characterId));
      console.log(`Removed from favorites: ${this.characterId}`);
    } else {
      this.store.dispatch(new AddFavorite(characterData)); // Armazenando o objeto com os dados do personagem
      console.log(`Added to favorites: ${this.characterId}`);
    }
  
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites);
    console.log('Current favorites:', favorites);
  }
  

  @Input() characterId!: number;
  @Input() characterName!: string; 
  @Input() characterSubtitle!: string; 
  @Input() characterType!: string; 
  @Input() characterImage!: string; 
  @Input() isFavorite!: boolean; 

}
