const DAYS = 20;
const HOURS = 24;
const MINS = 60;

export class Clock {
  private _years: number = 0;
  private _days: number = 0;
  private _hours: number = 0;
  private _minutes: number = 0;


  get years(): number {
    return this._years;
  }

  set years(value: number) {
    this._years = value;
  }

  get days(): number {
    return this._days;
  }

  set days(value: number) {
    this._days = value;
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    this._hours = value;
  }

  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    this._minutes = value;
  }
}
