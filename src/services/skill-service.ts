import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Helpers } from '../utilities/helpers';

export const Programming = new Skill('Programming', 'laptop', 'Program', Helpers.progressColors.primary);

@Injectable()
export class SkillService {
  private _skills: Skill[] = [];

  constructor() {
    this._skills.push(Programming);
    this._skills.push(new Skill('Painting', 'color-palette', 'Paint', Helpers.progressColors.secondary));
    this._skills.push(new Skill('Music', 'musical-notes', 'Practice', Helpers.progressColors.primary));
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }
}
