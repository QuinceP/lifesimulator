import { Injectable } from '@angular/core';
import { House } from '../models/house';

@Injectable()

export class HousingService {
  private _houses: House[];
  homeless: House;

  constructor() {
    this.homeless = new House('Homeless', 0, '');
    let bench = new House('Bench', 0, 'bench.jpg');
    let tent = new House('Tent', 500, 'tent.jpg');
    let attic = new House('Attic', 200, 'attic.jpg');
    let bedroom = new House('Bedroom', 500, 'bedroom.jpg');
    let apartment1 = new House('1 Bedroom Apartment', 800, 'apartment1.jpg');
    let apartment2 = new House('2 Bedroom Apartment', 1100, 'apartment2.jpg');
    let tinyHouse = new House('Tiny House', 1400, 'tiny_house.jpg');
    let smallHouse = new House('Small House', 1700, 'small_house.jpg');
    let house = new House('Average House', 2000, 'house.jpg');
    let bigHouse = new House('Big house', 4300, 'big_house.jpg');
    let mansion = new House('Mansion', 8000, 'mansion.jpg');
    let penthouse = new House('Penthouse', 10000, 'penthouse.jpg');

    this._houses = [
      bench,
      tent,
      attic,
      bedroom, apartment1,
      apartment2, tinyHouse, smallHouse, house, bigHouse, mansion, penthouse
    ]
  }

  get houses(): House[] {
    return this._houses;
  }

  set houses(value: House[]) {
    this._houses = value;
  }
}
