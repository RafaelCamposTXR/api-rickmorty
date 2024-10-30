import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  characters = [
    { id: 1, name: 'Rick Sanchez', gender: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    { id: 2, name: 'Rick Sanchez', gender: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    { id: 3, name: 'Rick Sanchez', gender: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
    { id: 4, name: 'Rick Sanchez', gender: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
  ];

  favoriteCharacterIds = [1]; 

  isCharacterFavorite(id: number): boolean {
    return this.favoriteCharacterIds.includes(id);
  }

}
