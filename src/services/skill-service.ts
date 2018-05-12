import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Helpers } from '../utilities/helpers';
import { SaveService } from './save-service';
import { Lumberjack } from './lumberjack';
import { Career } from '../models/career';

export const Programming = new Skill('Programming', 'laptop', 'Program', Helpers.progressColors.primary);
export const Art = new Skill('Painting', 'color-palette', 'Paint', Helpers.progressColors.secondary);
export const Music = new Skill('Music', 'musical-notes', 'Practice', Helpers.progressColors.primary);
export const Science = new Skill('Science', 'flask', 'Experiment', Helpers.progressColors.warning);
export const Mathematics = new Skill('Math', 'calculator', 'Prove Theorems', Helpers.progressColors.danger);
export const Business = new Skill('Business', 'trending-up', 'Make Sales', Helpers.progressColors.secondary);
export const Culinary = new Skill('Culinary', 'restaurant', 'Cook', Helpers.progressColors.warning);
export const StressManagement = new Skill('Stress Management', 'thermometer', 'Meditate', Helpers.progressColors.danger);
export const HealthyLiving = new Skill('Healthy Living', 'leaf', 'Research Health Tips', Helpers.progressColors.primary);

@Injectable()
export class SkillService {
  saveKey = 'skills';
  Programming: Skill = Programming;
  Art: Skill = Art;
  Music: Skill = Music;
  Science: Skill = Science;
  Mathematics: Skill = Mathematics;
  Business: Skill = Business;
  Culinary: Skill = Culinary;
  StressManagement: Skill = StressManagement;
  HealthyLiving: Skill = HealthyLiving;

  private defaultSkills: Skill[] = [
    Programming,
    Art,
    Music,
    Science,
    Mathematics,
    Business,
    Culinary,
    StressManagement,
    HealthyLiving
  ];

  private _skills: Skill[] = this.defaultSkills;

  constructor(public saveSvc: SaveService, public lumberjack: Lumberjack) {
  }

  reset() {
    this.skills = this.defaultSkills;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

  load():Promise<any>{
    return this.saveSvc.load(this.saveKey).then((val)=>{
      if (val){
        this.lumberjack.info(this.saveKey + ' loaded.');
        let assertedValue: Skill[] = val as Skill[];
        for (let i = 0; i < assertedValue.length; i++){
          assertedValue[i] = Object.assign(new Skill(), val[i]);
        }

        this.lumberjack.info(assertedValue);
        this.skills = assertedValue;
      }
      else {
        this.lumberjack.warn(this.saveKey + ' not loaded.');
      }
    }).catch((error)=> {
      this.lumberjack.error(error);
    });
  }

  save(){
    let value = this.skills;
    this.saveSvc.save(this.saveKey,  value).then((val) => {
      this.lumberjack.info(this.saveKey + ' saved successfully ' + new Date().toUTCString());
    }).catch((error) => {
      this.lumberjack.error('Could not save ' + this.saveKey +'.');
      this.lumberjack.error(error);
    })
  }
}
