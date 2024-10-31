import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface Character {
  id: number;
  name: string;
  species: string;
  type: string;
  image: string;
}

export interface FavoritesStateModel {
  favorites: Character[];
}

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public character: Character) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public id: number) {}
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: JSON.parse(sessionStorage.getItem('favorites') || '[]') // Carrega favoritos da sessão
  }
})
export class FavoritesState {
  @Selector()
  static getFavorites(state: FavoritesStateModel) {
    return state.favorites;
  }

  @Action(AddFavorite)
  addFavorite(ctx: StateContext<FavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState();
    const newFavorites = [...state.favorites, action.character];
    ctx.setState({
      ...state,
      favorites: newFavorites
    });
    sessionStorage.setItem('favorites', JSON.stringify(newFavorites)); // Armazena na sessão
  }

  @Action(RemoveFavorite)
  removeFavorite(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState();
    const newFavorites = state.favorites.filter(character => character.id !== action.id);
    ctx.setState({
      ...state,
      favorites: newFavorites
    });
    sessionStorage.setItem('favorites', JSON.stringify(newFavorites)); // Atualiza na sessão
  }
}
