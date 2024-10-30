import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() characterName!: string; 
  @Input() characterSubtitle!: string; 
  @Input() characterImage!: string; 
  @Input() isFavorite!: boolean; 

}
