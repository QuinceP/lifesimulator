import { Injectable } from '@angular/core';

const PREFIX = 'assets/imgs/housing/';

@Injectable()

export class House {
  private _img: string = 'bench.jpg';
  private _title: string = 'Tent';
  private _price: number = 20000;

  constructor(title:string, price: number, img: string){
    this.title = title;
    this.price = price;
    this.img = img;
  }

  get img(): string {
    return PREFIX + this._img;
  }

  set img(value: string) {
    this._img = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
}
