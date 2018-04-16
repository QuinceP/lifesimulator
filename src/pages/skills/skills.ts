import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
              public lumberjack: Lumberjack) {
  }

  ionViewCanEnter(){
    this.skills = this.skillSvc.skills;
    this.lumberjack.info(this.skillSvc);
    this.lumberjack.info(this.skills);
    this.selectedSkill = this.skills[0];
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
      this.selectedSkill.currentExp += baseExp + this.getExperienceBonus(this.selectedSkill, baseExp);
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
      default:
        break;
    }

    if (bonusSkillLevel > 50) {
      bonusExp = Math.floor((bonusSkillLevel / 100) * baseExp);
    }
    return bonusExp;
  }
}
