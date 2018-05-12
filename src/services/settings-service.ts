import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Helpers, Themes } from '../utilities/helpers';

@Injectable()
export class SettingsService {

  private theme: BehaviorSubject<string>;

  constructor() {
    this.theme = new BehaviorSubject(Themes.Default);
  }

  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }
}
