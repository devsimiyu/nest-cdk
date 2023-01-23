import { createAction, props } from "@ngrx/store";
import { ICartItem } from "./reducer";

export const cartAddAction = createAction('[Cart Page] Add', props<{item: ICartItem}>());
export const cartDeleteAction = createAction('[Cart Page] Delete', props<{id: number}>());
export const cartSelectAction = createAction('[Cart Page] Select', props<{id: number}>());
export const cartLoadAction = createAction('[Cart Page] Load');
export const cartLoadProgressAction = createAction('[Cart API] Load Progress', props<{isLoading: boolean}>());
export const cartLoadSuccessAction = createAction('[Cart API] Load Success', props<{items: Array<ICartItem>}>());
export const cartLoadErrorAction = createAction('[Cart API] Load Error', props<{error: Error}>());
export const cartUpdateAction = createAction('[Cart Page] Update', props<{item: ICartItem}>());
export const cartUpdateProgressAction = createAction('[Cart API] Update Progress', props<{isUpdating: boolean}>());
export const cartUpdateSuccessAction = createAction('[Cart API] Update Success', props<{item: ICartItem}>());
export const cartUpdateErrorAction = createAction('[Cart API] Update Error', props<{error: Error}>());
