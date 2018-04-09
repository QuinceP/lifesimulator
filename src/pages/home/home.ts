import { ChangeDetectorRef, Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { Gender, Person, Stat } from '../../models/person';
import { TimeService } from '../../services/time-service';
import { Action } from '../../models/action';
import { TranslateService } from '../../utilities/translate/translate-service';
import { Lumberjack } from '../../services/lumberjack';
import { StatusComponent, StatusTypes } from '../../components/status-bar/status-bar';
import { Helpers } from '../../utilities/helpers';
import { InventoryPage } from '../inventory/inventory';
import { environment } from '../../environments/environment';
import { SkillService } from '../../services/skill-service';
import { GameplayStatNames, GameplayStatsService } from '../../services/gameplay-stats-service';


/* The Culinary skill multiplier for hunger bonus.
  max bonus divided by max skill level;
  will be multiplied by skill to get bonus (so lvl 100 culinary gets 35 bonus)
 */
const culinaryMultiplier: number = 35 / 100;
const moodMultiplier: number = 15 / 100;
const healthMultiplier: number = 50 / 100;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  player: Person;
  statusComponent;
  Helpers;
  statusTypes;
  Gender;
  showDebugButtons = !environment.production;
  foodCost: number = 25;
  funCost: number = 75;
  doctorCost: number = 100;

  constructor(public navCtrl: NavController,
              private playerSvc: PlayerService,
              public timeSvc: TimeService,
              public alertCtrl: AlertController,
              public translateSvc: TranslateService,
              public lumberjack: Lumberjack,
              public changeRef: ChangeDetectorRef,
              public skillSvc: SkillService,
              public gameplayStatsSvc: GameplayStatsService) {
    this.player = this.playerSvc.player;
    this.Helpers = Helpers;
    this.statusTypes = StatusTypes;
    this.Gender = Gender;
  }

  statBonus(statusType: StatusTypes): number {
    let skillLevel: number;
    switch (statusType) {
      case StatusTypes.Hunger:
        skillLevel = this.skillSvc.skills.filter(
          (skill) => {
            return skill.name.toLowerCase() == this.skillSvc.Culinary.name.toLowerCase()
          }
        )[0].level;
        return skillLevel * culinaryMultiplier;
      case StatusTypes.Mood:
        skillLevel = this.skillSvc.skills.filter(
          (skill) => {
            return skill.name.toLowerCase() == this.skillSvc.StressManagement.name.toLowerCase()
          }
        )[0].level;
        return skillLevel * moodMultiplier;
      case StatusTypes.Health:
        skillLevel = this.skillSvc.skills.filter(
          (skill) => {
            return skill.name.toLowerCase() == this.skillSvc.HealthyLiving.name.toLowerCase()
          }
        )[0].level;
        return skillLevel * healthMultiplier;
      default:
        break;
    }
    return 0;
  }

  eat() {
    if (this.player.hunger < 100) {
      if (this.player.money >= this.foodCost) {
        let workAction = new Action('Eat', 0.25, () => {
          this.playerSvc.player.hunger += 15 + this.statBonus(StatusTypes.Hunger);
          this.playerSvc.player.money -= this.foodCost;
        });

        this.timeSvc.performTimedAction(workAction);
      }
      else {
        this.showInsufficientFundsAlert();
      }
    }
    else {
      //full
    }
  }

  doctor() {
    if (this.player.health < 100) {
      if (this.player.money >= this.doctorCost) {
        let doctorAction = new Action('Go to Doctor', 0.25, () => {
          this.playerSvc.player.health += 15;
          this.playerSvc.player.money -= this.doctorCost;
        });
        this.timeSvc.performTimedAction(doctorAction);
      }
      else {
        this.showInsufficientFundsAlert();
      }
    }
    else {
      //perfect health
    }
  }

  mood() {
    if (this.player.mood < 100) {
      if (this.player.money >= this.funCost) {
        let action = new Action('Play Videogames', 0.25, () => {
          this.playerSvc.player.mood += 15;
          this.playerSvc.player.money -= this.funCost;
        });
        this.timeSvc.performTimedAction(action);
      }
      else {
        this.showInsufficientFundsAlert();
      }
    }
    else {
      //max happy
    }
  }

  die() {
    this.gameplayStatsSvc.stats[GameplayStatNames.Death].count += 1;
    this.playerSvc.die();
    this.playerSvc.birth();
    this.player = this.playerSvc.player;
  }

  refresh() {
    this.playerSvc.birth();
    this.player = this.playerSvc.player;
  }

  getStatus(value: number, statusType: StatusTypes): string {
    return StatusComponent.getStatus(value, statusType);
  }

  getStatusLevel(value: number): number {
    return StatusComponent.getStatusLevel(value);
  }

  goToInventory() {
    this.navCtrl.push(InventoryPage);
  }

  showInsufficientFundsAlert() {
    let alert = this.alertCtrl.create({
      message: 'You don\'t have enough money.',
      buttons: [{
        text: 'Ok',
        cssClass: 'game-alert'
      }],
    });
    alert.present();
  }
}
