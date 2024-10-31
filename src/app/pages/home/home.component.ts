import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service'; 
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../store/favorites.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1; 
  totalPages: number = 0; 

  constructor(private characterService: CharacterService, private store: Store) {}

  ngOnInit(): void {
    this.loadCharacters(this.currentPage); 
  }

  loadCharacters(page: number): void {
    this.characterService.getCharacters(page).subscribe(
      data => {
        this.characters = data.results;
        this.totalPages = data.info.pages; 
        console.log('Personagens recebidos:', this.characters);
      },
      error => console.error('Erro ao buscar personagens:', error)
    );
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters(this.currentPage); 
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.currentPage); 
    }
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {  
      this.currentPage = 1;
      this.loadCharacters(this.currentPage); 
    }
  }

  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites) || []; 
    return favorites.some(character => character.id === characterId);
  }
}
