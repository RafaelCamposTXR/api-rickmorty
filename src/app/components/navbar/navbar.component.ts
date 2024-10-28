import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../favorite.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  favoriteCount: number = 0;

  constructor(private favoriteService: FavoriteService) { 
    this.favoriteService.favoriteCount$.subscribe(count => {
    this.favoriteCount = count;
    });
  }

  ngOnInit(): void {
    this.favoriteService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;
    });
  }

  addFavorite() {
    this.favoriteService.addFavorite(); 
  }

  removeFavorite() {
    this.favoriteService.removeFavorite(); 
  }

}
