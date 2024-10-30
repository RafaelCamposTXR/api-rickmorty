import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface FavoritesStateModel {
  favorites: number[]; 
}

export class AddFavorite {
  static readonly type = '[Favorites] Add';
  constructor(public id: number) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove';
  constructor(public id: number) {}
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: []
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
    ctx.setState({
      ...state,
      favorites: [...state.favorites, action.id]
    });
  }

  @Action(RemoveFavorite)
  removeFavorite(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      favorites: state.favorites.filter(id => id !== action.id)
    });
  }
}
