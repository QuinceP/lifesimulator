import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Helpers } from '../utilities/helpers';

export const Programming = new Skill('Programming', 'laptop', 'Program', Helpers.progressColors.primary);
export const Art = new Skill('Painting', 'color-palette', 'Paint', Helpers.progressColors.secondary);
export const Music = new Skill('Music', 'musical-notes', 'Practice', Helpers.progressColors.primary);
export const Science = new Skill('Science', 'flask', 'Experiment', Helpers.progressColors.warning);

@Injectable()
export class SkillService {
  private _skills: Skill[] = [];

  constructor() {
    this._skills.push(
      Programming,
      Art,
      Music,
      Science
    );
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set skills(value: Skill[]) {
    this._skills = value;
  }
}
