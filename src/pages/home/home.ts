import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { Person } from '../../models/person';
import { Helpers } from '../../utilities/helpers';
import { TimeService } from '../../services/time-service';
import { Action } from '../../models/action';
import { TranslateService } from '../../utilities/translate/translate-service';

export enum StatusTypes {
  Mood,
  Hunger,
  Health,
  Appearance,
  Intelligence,
  Agility,
  Charisma,
  Dexterity,
  Strength
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private player: Person;


  constructor(public navCtrl: NavController,
              private playerSvc: PlayerService,
              public timeSvc: TimeService,
              public alertCtrl: AlertController,
              public translateSvc: TranslateService) {
    this.player = this.playerSvc.player;
    this.Statuses = {
      Mood: ['Depressed', 'Unhappy', 'Content', 'Happy', 'Elated'],
      Hunger: ['Starving', 'Hungry', 'Content', 'Full', 'Stuffed'],
      Health: ['Dying', 'Ill', 'Average', 'Excellent', 'Healthy'],
      Appearance: ['Hideous', 'Ugly', 'Average', 'Attractive', 'Gorgeous'],
      Intelligence: ['Idiot', 'Dumb', 'Average', 'Smart', 'Genius'],
      Agility: ['Sluggish', 'Slow', 'Average', 'Quick', 'Swift'],
      Charisma: ['Socially Inept', 'Awkward', 'Average', 'Charming', 'Magnetic'],
      Dexterity: ['Oafish', 'Clumsy', 'Average', 'Deft', 'Nimble'],
      Strength: ['Feeble', 'Weak', 'Average', 'Strong', 'Powerful']
  };

    // for (let status in this.Statuses){
    // }
  }

  private StatusTypes = StatusTypes;
  private Helpers = Helpers;

  private Statuses;

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

  ionViewDidLoad() {
    let alert = this.alertCtrl.create({
      message: 'Your name is ' + this.playerSvc.player.firstName + ' ' +
      this.playerSvc.player.lastName + '. You were born in '
      + this.playerSvc.player.nationality + '.',
      buttons: [{
        text: 'Dismiss',
        cssClass: 'game-alert'
      }],
    });
    // alert.present();
  }

  refresh() {
    this.playerSvc.birth();
    this.player = this.playerSvc.player;
  }

  getStatusLevel(value: number): number {
    if (value >= 80) {
      return 4;
    }
    else if (value >= 60) {
      return 3;
    }
    else if (value >= 40) {
      return 2;
    }
    else if (value >= 20) {
      return 1;
    }
    else {
      return 0;
    }
  }

  getStatus(value: number, statusType: StatusTypes): string {
    let statusLevel = this.getStatusLevel(value);

    switch (statusType) {
      case StatusTypes.Mood:
        return this.Statuses.Mood[statusLevel];

      case StatusTypes.Hunger:
        return this.Statuses.Hunger[statusLevel];

      case StatusTypes.Health:
        return this.Statuses.Health[statusLevel];

      case StatusTypes.Appearance:
        return this.Statuses.Appearance[statusLevel];

      case StatusTypes.Intelligence:
        return this.Statuses.Intelligence[statusLevel];

      case StatusTypes.Agility:
        return this.Statuses.Agility[statusLevel];

      case StatusTypes.Charisma:
        return this.Statuses.Charisma[statusLevel];

      case StatusTypes.Dexterity:
        return this.Statuses.Dexterity[statusLevel];

      case StatusTypes.Strength:
        return this.Statuses.Strength[statusLevel];
    }
  }


}
