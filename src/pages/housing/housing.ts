import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HousingService } from '../../services/housing-service';
import faker from 'faker';
import { PlayerService } from '../../services/player-service';
import { Helpers } from '../../utilities/helpers';
import { House } from '../../models/House';
import { TimeService } from '../../services/time-service';

/**
 * Generated class for the HousingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-housing',
  templateUrl: 'housing.html',
})
export class HousingPage {
  private loremIpsum: string[] = [];
  private progressColors = Helpers.progressColors;

  constructor(public navCtrl: NavController, public navParams: NavParams, public housingSvc: HousingService, public playerSvc: PlayerService, public timeSvc: TimeService) {
    for (let i = 0; i < this.housingSvc.houses.length; i++){
      this.loremIpsum.push(faker.fake("{{lorem.paragraph}}"));
    }
  }

  buyHouse(house: House){
    if (this.playerSvc.player.money >= house.price){
      this.playerSvc.player.house = house;
      this.playerSvc.player.money -= house.price;
    }
  }
}
