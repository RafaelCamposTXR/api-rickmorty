import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterMenuComponent } from './components/character-menu/character-menu.component'; 
import { CharacterService } from './services/character.service';
import { FavoritesState } from './store/favorites.state'; 


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FavoritesComponent,
    SearchBoxComponent,
    CharacterCardComponent,
    CharacterMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([FavoritesState]),
  ],
  providers: [CharacterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
