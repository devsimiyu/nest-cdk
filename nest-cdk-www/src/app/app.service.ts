import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { delay, Observable, of } from 'rxjs';
import { ICartItem } from './store/reducer';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  fetchCartItems(): Observable<ICartItem[]> {
    const items = Array.from({length: 5}).map((_, index) => (<ICartItem>{
      id: parseInt(faker.helpers.unique(faker.random.numeric)),
      product: faker.commerce.product(),
      price: parseFloat(faker.commerce.price()),
      quantity: parseInt(faker.random.numeric(index % 3 ? 2 : 1))
    }));
    return of(items).pipe(delay(7000));
  }

  updateCartItem(item: ICartItem): Observable<void> {
    return of().pipe(delay(10000));
  }

}
