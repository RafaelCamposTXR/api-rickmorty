import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesState, Character } from '../../store/favorites.state';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;

  favoriteCount: number = 0;
  activeRoute: string = ''; 

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.favorites$.subscribe(favorites => {
      this.favoriteCount = favorites.length;
    });
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd)) // Filtra os eventos do tipo NavigationEnd
    .subscribe((event) => {
      const navigationEndEvent = event as NavigationEnd; // Fazendo cast para NavigationEnd
      this.activeRoute = navigationEndEvent.urlAfterRedirects; // Atualiza a rota ativa
    });
  }
  menuOpen = false;


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false; 
  }

}
