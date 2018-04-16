import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HousingService } from '../../services/housing-service';
import faker from 'faker';
import { PlayerService } from '../../services/player-service';
import { Helpers } from '../../utilities/helpers';
import { House } from '../../models/house';
import { TimeService } from '../../services/time-service';
import { Person } from '../../models/person';
import { Lumberjack } from '../../services/lumberjack';

@Component({
  selector: 'page-housing',
  templateUrl: 'housing.html',
})
export class HousingPage {
  private loremIpsum: string[] = [];
  private player: Person;
  private progressColors = Helpers.progressColors;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public housingSvc: HousingService,
              public playerSvc: PlayerService,
              public timeSvc: TimeService,
              public lumberjack: Lumberjack) {
    for (let i = 0; i < this.housingSvc.houses.length; i++) {
      this.loremIpsum.push(faker.fake("{{lorem.paragraph}}"));
    }
  }

  ionViewCanEnter(){
    this.player = this.playerSvc.player;
    this.lumberjack.info(this.playerSvc);
    this.lumberjack.info(this.player);
  }

  buyHouse(house: House) {
    if (this.playerSvc.player.money >= house.price) {
      this.playerSvc.player.house = house;
      this.playerSvc.player.money -= house.price;
    }
  }
}
