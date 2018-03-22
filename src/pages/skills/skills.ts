import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SkillService } from '../../services/skill-service';
import { Skill } from '../../models/skill';
import { Helpers } from '../../utilities/helpers';
import { Action } from '../../models/action';
import { TimeService } from '../../services/time-service';

/**
 * Generated class for the SkillsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-skills',
  templateUrl: 'skills.html',
})
export class SkillsPage {
  private selectedSkill: Skill;
  constructor(public navCtrl: NavController, public navParams: NavParams, public skillSvc: SkillService, public timeSvc: TimeService) {
    this.selectedSkill = this.skillSvc.skills[0];
  }

  selectSkill(skill: Skill){
    this.selectedSkill = skill;
  }

  getColor(value: number){
    return Helpers.getColor(value);
  }

  trainSkill(){
    let actionName = this.selectedSkill.name;
    let action = new Action(actionName, 1, ()=>{
      this.selectedSkill.currentExp += 100;
    });

    this.timeSvc.performTimedAction(action);
  }
}
