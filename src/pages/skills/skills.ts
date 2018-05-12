import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController } from 'ionic-angular';
import { SkillService } from '../../services/skill-service';
import { Skill } from '../../models/skill';
import { Helpers } from '../../utilities/helpers';
import { Action } from '../../models/action';
import { TimeService } from '../../services/time-service';
import { PlayerService } from '../../services/player-service';
import { Lumberjack } from '../../services/lumberjack';

@Component({
  selector: 'page-skills',
  templateUrl: 'skills.html',
})
export class SkillsPage {
  private selectedSkill: Skill;
  private skills: Skill[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public skillSvc: SkillService,
              public timeSvc: TimeService,
              public playerSvc: PlayerService,
              public lumberjack: Lumberjack,
              public events: Events,
              public toastCtrl: ToastController) {
    this.events.subscribe('level-up', () => {
      this.presentLevelUpToast();
    })
  }

  ionViewCanEnter() {
    this.skills = this.skillSvc.skills;
    this.lumberjack.info(this.skillSvc);
    this.lumberjack.info(this.skills);
    this.selectedSkill = this.skills[0];
  }

  presentLevelUpToast() {
    this.toastCtrl.create({
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok',
      message: 'Level up! ' + this.selectedSkill.name + ' now at ' + this.selectedSkill.level,
      duration: 750
    }).present();
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
  }

  getColor(value: number) {
    return Helpers.getColor(value);
  }

  trainSkill() {
    let actionName: string = this.selectedSkill.name;
    let baseExp: number = 50;
    let action = new Action(actionName, 2, () => {
      let prevLevel = this.selectedSkill.level;
      this.selectedSkill.currentExp += baseExp + this.getExperienceBonus(this.selectedSkill, baseExp);
      if (this.selectedSkill.level > prevLevel){
        this.events.publish('level-up');
      }
    });

    this.timeSvc.performTimedAction(action);
  }

  getExperienceBonus(skill: Skill, baseExp: number): number {
    let lowercaseSkillName: string = skill.name.toLowerCase();
    let bonusExp: number = 0;
    let bonusSkillLevel: number = 0;
    switch (lowercaseSkillName) {
      case 'programming':
      case 'science':
        bonusSkillLevel = this.playerSvc.player.intelligence;
        break;
      case 'business':
        bonusSkillLevel = this.playerSvc.player.charisma;
      default:
        break;
    }

    if (bonusSkillLevel > 50) {
      bonusExp = Math.floor((bonusSkillLevel / 100) * baseExp);
    }
    return bonusExp;
  }
}
