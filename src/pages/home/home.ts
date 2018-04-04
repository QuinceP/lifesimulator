import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { Gender, Person } from '../../models/person';
import { TimeService } from '../../services/time-service';
import { Action } from '../../models/action';
import { TranslateService } from '../../utilities/translate/translate-service';
import { Lumberjack } from '../../services/lumberjack';
import { StatusComponent, StatusTypes } from '../../components/status-bar/status-bar';
import { Helpers } from '../../utilities/helpers';
import { InventoryPage } from '../inventory/inventory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private player: Person;
  statusComponent;
  Helpers;
  statusTypes;
  Gender;
  constructor(public navCtrl: NavController,
              private playerSvc: PlayerService,
              public timeSvc: TimeService,
              public alertCtrl: AlertController,
              public translateSvc: TranslateService,
              public lumberjack: Lumberjack,
              public changeRef: ChangeDetectorRef) {
    this.player = this.playerSvc.player;
    this.Helpers = Helpers;
    this.statusTypes = StatusTypes;
    this.Gender = Gender;
  }

  eat() {
    if (this.player.hunger < 100) {
      let workAction = new Action('Eat', 0.25, () => {
        this.playerSvc.player.hunger += 15;
      });

      this.timeSvc.performTimedAction(workAction);
    }
  }

  doctor() {
    if (this.player.health < 100) {
      let doctorAction = new Action('Go to Doctor', 0.25, () => {
        this.playerSvc.player.health += 15;
      });
      this.timeSvc.performTimedAction(doctorAction);
    }
  }

  mood() {
    if (this.player.mood < 100) {
      let action = new Action('Play Videogames', 0.25, () => {
        this.playerSvc.player.mood += 15;
      });
      this.timeSvc.performTimedAction(action);
    }
  }

  increaseNeed(nee) {
  }

  die() {
    this.playerSvc.die();
    this.playerSvc.birth();
    this.player = this.playerSvc.player;
  }

  refresh() {
    this.playerSvc.birth();
    this.player = this.playerSvc.player;
  }

  getStatus(value: number, statusType: StatusTypes): string{
    return StatusComponent.getStatus(value, statusType);
  }

  getStatusLevel(value: number): number{
    return StatusComponent.getStatusLevel(value);
  }

  goToInventory(){
    this.navCtrl.push(InventoryPage);
  }
}
