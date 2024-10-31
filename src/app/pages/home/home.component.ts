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
  searchTerm: string = '';

  constructor(private characterService: CharacterService, private store: Store) {}

  ngOnInit(): void {
    this.loadCharacters(this.currentPage, this.searchTerm); 
  }

  loadCharacters(page: number, searchTerm: string): void {
    this.characterService.getCharacters(page, searchTerm).subscribe(
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
      this.loadCharacters(this.currentPage, this.searchTerm); 
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters(this.currentPage, this.searchTerm); 
    }
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {  
      this.currentPage = 1;
      this.loadCharacters(this.currentPage, this.searchTerm);
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term; 
    this.currentPage = 1; 
    this.loadCharacters(this.currentPage, this.searchTerm); 
  }

  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites) || []; 
    return favorites.some(character => character.id === characterId);
  }
}
