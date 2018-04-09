import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Helpers } from '../utilities/helpers';

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
  Programming: Skill = Programming;
  Art: Skill = Art;
  Music: Skill = Music;
  Science: Skill = Science;
  Mathematics: Skill = Mathematics;
  Business: Skill = Business;
  Culinary: Skill = Culinary;
  StressManagement: Skill = StressManagement;
  HealthyLiving: Skill = HealthyLiving;

  private _skills: Skill[] = [
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

  constructor() {
  }

  reset() {
    for (let skill of this.skills) {
      skill.level = 0;
    }
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }

}
