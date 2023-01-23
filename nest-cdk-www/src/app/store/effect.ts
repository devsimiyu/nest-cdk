import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, of, finalize, tap, concatMap } from "rxjs";
import { AppService } from "../app.service";
import { 
  cartLoadAction, 
  cartLoadErrorAction, 
  cartLoadProgressAction, 
  cartLoadSuccessAction, 
  cartUpdateAction, 
  cartUpdateErrorAction, 
  cartUpdateProgressAction, 
  cartUpdateSuccessAction 
} from "./action";
import { ICartItem } from "./reducer";

@Injectable()
export class CartEffect {
  private readonly actions$ = inject(Actions);
  private readonly appService = inject(AppService);

  loadCart$ = createEffect(
    () => this.actions$.pipe(
      ofType(cartLoadAction),
      tap(() => cartLoadProgressAction({isLoading: true})),
      switchMap(() => {
        return this.appService.fetchCartItems().pipe(
          map((items: Array<ICartItem>) => cartLoadSuccessAction({items})),
          catchError((error: Error) => of(cartLoadErrorAction({error})))
        );
      }),
      finalize(() => cartLoadProgressAction({isLoading: false}))
    )
  );

  updateCart$ = createEffect(
    () => this.actions$.pipe(
      ofType(cartUpdateAction),
      tap(() => cartUpdateProgressAction({isUpdating: true})),
      concatMap(({item}) => {
        return this.appService.updateCartItem(item).pipe(
          map(() => cartUpdateSuccessAction({item})),
          catchError(error => of(cartUpdateErrorAction({error})))
        );
      }),
      finalize(() => cartUpdateProgressAction({isUpdating: false}))
    )
  );
}
