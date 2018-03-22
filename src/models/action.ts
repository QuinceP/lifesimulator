import { Injectable } from '@angular/core';

@Injectable()
export class Action {
  private _name: string;
  private _duration: number;
  private _timesTaken: number = 0;
  private _actionFunction: Function;

  constructor(name: string, durationInHours: number, actionFunction: Function) {
    this.name = name;
    this.durationInHours = durationInHours;
    this.actionFunction = actionFunction;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get durationInHours(): number {
    return this._duration;
  }

  set durationInHours(value: number) {
    this._duration = value;
  }

  get timesTaken(): number {
    return this._timesTaken;
  }

  set timesTaken(value: number) {
    this._timesTaken = value;
  }


  get actionFunction(): Function {
    return this._actionFunction;
  }

  set actionFunction(value: Function) {
    this._actionFunction = value;
  }

  act(actionCount: number = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.actionFunction) {
        this.actionFunction();
        this.timesTaken += actionCount;
        resolve();
      }
      else {
        reject('no action function');
      }
    });
  }
}
