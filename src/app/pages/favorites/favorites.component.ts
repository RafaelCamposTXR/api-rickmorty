import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service'; 
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../store/favorites.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  characters: any[] = [];

  constructor(private characterService: CharacterService, private store: Store) {}

  ngOnInit(): void {
    this.loadFavoriteCharacters(); 
  }

  loadFavoriteCharacters(): void {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites) || []; 
  
    this.characterService.getAllCharacters().subscribe(
      characters => {  
        this.characters = characters.filter(character => favorites.includes(character.id));
  
        console.log('Personagens favoritos:', this.characters);
  
        const favoriteIds = characters.map(character => character.id);
        console.log('IDs de personagens favoritos disponíveis:', favoriteIds);
      },
      error => console.error('Erro ao buscar personagens:', error)
    );
  }
  



}
