import { Component } from '@angular/core';

import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tab.html'
})
export class TabPage {

  tab1Root = MenuPage;

  constructor() {

  }
}
