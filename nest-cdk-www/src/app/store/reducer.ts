import { createReducer, on } from "@ngrx/store";
import { 
  cartAddAction, 
  cartDeleteAction, 
  cartLoadErrorAction, 
  cartLoadProgressAction, 
  cartLoadSuccessAction, 
  cartSelectAction, 
  cartUpdateErrorAction, 
  cartUpdateProgressAction, 
  cartUpdateSuccessAction 
} from "./action";
import * as AppState from "./state";

export enum CartStatus {
  OPEN,
  CLOSED,
  CANCELLED
}

export interface ICartItem {
  id: number;
  product: string;
  price: number;
  attributes?: Map<string, string>;
  quantity: number;
}

export interface IState extends AppState.IState {
  cart: ICartState;
}

export interface ICartState {
  isLoading: boolean;
  isUpdating: boolean;
  error?: Error;
  items: Array<ICartItem>;
  id?: number;
}

const initState: ICartState = {
  isLoading: false,
  isUpdating: false,
  items: []
};

export const cartReducer = createReducer<ICartState>(
  initState,
  on(cartAddAction, (state, {item}): ICartState => {
    const items = state.items.concat(item);
    return {...state, items};
  }),
  on(cartDeleteAction, (state, {id}) => {
    const items = state.items.filter(x => x.id !== id);
    return {...state, items};
  }),
  on(cartSelectAction, (state, {id}) => ({...state, id})),
  on(cartLoadProgressAction, (state, {isLoading}) => ({...state, isLoading})),
  on(cartLoadSuccessAction, (state, {items}) => ({...state, items, error: undefined})),
  on(cartLoadErrorAction, (state, {error}) => ({...state, error})),
  on(cartUpdateProgressAction, (state, {isUpdating}) => ({...state, isUpdating})),
  on(cartUpdateSuccessAction, (state, {item}) => ({...state, items: state.items.map(x => x.id === item.id ? item : x)})),
  on(cartUpdateErrorAction, (state, {error}) => ({...state, error}))
);
