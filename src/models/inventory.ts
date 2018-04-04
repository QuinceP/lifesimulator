import { Injectable } from '@angular/core';
import { StatBook } from '../pages/shopping/shopping';

@Injectable()
export class Inventory {
  private _items: {
    'books': StatBook[];
  };

  constructor(){
    this.items = {'books': []};
  }

  get items(): { books: StatBook[] } {
    return this._items;
  }

  set items(value: { books: StatBook[] }) {
    this._items = value;
  }
}
