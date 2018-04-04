import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { TimeService } from '../../services/time-service';
import { Stat } from '../../models/person';
import { Helpers } from '../../utilities/helpers';
import { StatBook } from '../shopping/shopping';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public playerSvc: PlayerService,
              public timeSvc: TimeService) {
  }

  getStatIcon(stat: string) {
    let icon: string = '';
    switch (stat) {
      case Stat.Appearance:
        icon = 'thermometer';
        break;
      case Stat.Intelligence:
        icon = 'book';
        break;
      case Stat.Strength:
        icon = 'american-football';
        break;
      case Stat.Agility:
        icon = 'walk';
        break;
      case Stat.Dexterity:
        icon = 'bicycle';
        break;
      case Stat.Charisma:
        icon = 'call';
    }
    return icon;
  }

  getStatColor(stat: string) {
    let color: string = '';
    switch (stat) {
      case Stat.Appearance:
        color = Helpers.progressColors.danger;
        break;
      case Stat.Intelligence:
        color = Helpers.progressColors.primary;
        break;
      case Stat.Strength:
        color = Helpers.progressColors.secondary;
        break;
      case Stat.Agility:
        color = Helpers.progressColors.warning;
        break;
      case Stat.Dexterity:
        color = Helpers.progressColors.danger;
        break;
      case Stat.Charisma:
        color = Helpers.progressColors.warning;
    }
    return color;
  }

  readBook(book: StatBook) {
    this.playerSvc.readBook(book);
  }

}
