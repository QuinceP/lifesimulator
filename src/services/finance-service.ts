import { Injectable } from '@angular/core';
import { SaveService } from './save-service';
import { Lumberjack } from './lumberjack';
import { Helpers } from '../utilities/helpers';

@Injectable()
export class FinanceService {
  saveKey = 'finance';
  private _accountBalance: number = 0;

  constructor(public saveSvc: SaveService,
              public lumberjack: Lumberjack) {
  }

  load(): Promise<any>{
    return this.saveSvc.load(this.saveKey).then((val)=>{
      if (val == 0 || val){
        this.lumberjack.info(this.saveKey + ' loaded.');
        this.lumberjack.info(val);
        this.accountBalance = val as number;
        }
      else {
        this.lumberjack.warn(this.saveKey + ' not loaded.');
      }
    }).catch((error)=> {
      this.lumberjack.error(error);
    });
  }

  save(){
    let value = this.accountBalance;
    this.saveSvc.save(this.saveKey,  value).then((val) => {
      this.lumberjack.info(this.saveKey + ' saved successfully ' + new Date().toUTCString());
    }).catch((error) => {
      this.lumberjack.error('Could not save ' + this.saveKey +'.');
      this.lumberjack.error(error);
    })
  }

  get accountBalance(): number {
    return this._accountBalance;
  }

  set accountBalance(value: number) {
    this._accountBalance = value;
  }
}
