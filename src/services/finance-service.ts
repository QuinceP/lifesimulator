import { Injectable } from '@angular/core';

@Injectable()
export class FinanceService {
  private _accountBalance: number = 1000;

  constructor() {
  }

  get accountBalance(): number {
    return this._accountBalance;
  }

  set accountBalance(value: number) {
    this._accountBalance = value;
  }
}
