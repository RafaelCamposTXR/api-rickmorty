import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddFavorite, RemoveFavorite } from '../../store/favorites.state';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  constructor(private store: Store) { }

  

  ngOnInit(): void {
  }

  toggleFavorite(characterId: number, isFavorite: boolean) {
    if (isFavorite) {
      this.store.dispatch(new RemoveFavorite(characterId));
    } else {
      this.store.dispatch(new AddFavorite(characterId));
    }
  }

  @Input() characterName!: string; 
  @Input() characterSubtitle!: string; 
  @Input() characterType!: string; 
  @Input() characterImage!: string; 
  @Input() isFavorite!: boolean; 

}
