import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service'; 
import { Store } from '@ngxs/store';
import { FavoritesState } from '../../store/favorites.state';
import { timer, firstValueFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  errorMessage: string = '';  

  constructor(private characterService: CharacterService, private store: Store) {}

  ngOnInit(): void {
    this.loadCharacters(this.currentPage, this.searchTerm); 
  }

  loadCharacters(page: number, searchTerm: string): void {
    this.characterService.getCharacters(page, searchTerm).subscribe(
      data => {
        if (data.error) {  
          this.errorMessage = data.error; 
          this.characters = [];  
        } else {
          this.characters = data.results;
          this.totalPages = data.info.pages; 
          this.errorMessage = '';  
        }
        console.log('Personagens recebidos:', this.characters);
      },
      error => {
        console.error('Erro ao buscar personagens:', error);
        this.errorMessage = 'Erro ao carregar personagens. Tente novamente mais tarde.';  
      }
    );
  }

  handleEmptySearch() {
    this.errorMessage = ''; 
    
    return timer(300).pipe(
      switchMap(() => {
        return this.characterService.getCharacters(this.currentPage, ''); 
      })
    );
  }

  async onSearch(term: string): Promise<void> {
    this.searchTerm = term; 
    this.currentPage = 1; 

    if (this.searchTerm.trim() === '') {
      try {
        const data = await firstValueFrom(this.handleEmptySearch());
        if (data.error) {
          this.errorMessage = data.error; 
          this.characters = []; 
        } else {
          this.characters = data.results;
          this.totalPages = data.info.pages; 
          this.errorMessage = ''; 
        }
      } catch (error) {
        console.error('Erro ao buscar personagens na busca vazia:', error);
        this.errorMessage = 'Erro ao carregar personagens. Tente novamente mais tarde.';
      }
    } else {
      this.loadCharacters(this.currentPage, this.searchTerm); 
    }
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

  goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {  
      this.currentPage = this.totalPages;
      this.loadCharacters(this.currentPage, this.searchTerm);
    }
  }

  isFavorite(characterId: number): boolean {
    const favorites = this.store.selectSnapshot(FavoritesState.getFavorites) || []; 
    return favorites.some(character => character.id === characterId);
  }
}
