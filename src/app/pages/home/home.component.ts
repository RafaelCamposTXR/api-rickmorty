import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service'; 
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../store/favorites.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];

  constructor(private characterService: CharacterService, private store: Store) {}

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(
      data => {
        this.characters = data.results;
        console.log('Personagens recebidos:', this.characters); 
      },
      error => console.error('Erro ao buscar personagens:', error) 
    );
  }


  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites) || []; 
    return favorites.includes(characterId);
  }
  
}
