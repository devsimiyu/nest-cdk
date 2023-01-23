import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICartState } from "./reducer";

const cartFeatureState = createFeatureSelector<ICartState>('cart');

export const cartLoadingSelect = createSelector(
  cartFeatureState,
  state => state.isLoading
);

export const cartItemsSelect = createSelector(
  cartFeatureState,
  state => state.items
);

export const cartErrorSelect = createSelector(
  cartFeatureState,
  state => state.error
);

export const cartIdSelect = createSelector(
  cartFeatureState,
  state => state.id
);

export const cartItemSelect = createSelector(
  cartFeatureState,
  cartIdSelect,
  (state, id) => state.items.find(x => x.id === id)
);
