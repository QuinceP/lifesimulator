import { Skill } from './skill';
import { Stat } from './person';

export interface Requirement {
  skill?: Skill;
  level?: number;
  stat?: Stat;
  statLevel?: number;
}

export class Job {
  private _title: string;
  private _description: string;
  private _hourlyRate: number;
  private _careerLevel: number;
  private _totalExp: number;
  private _currentExp: number = 0;
  private _career: string;
  private _requirements: Requirement[];

  constructor(title: string = '',
              careerLevel: number = 0,
              hourlyRate: number = 0,
              career: string = '',
              requirements: Requirement[] = [],
              description: string = '') {
    this.title = title;
    this.careerLevel = careerLevel;
    this.hourlyRate = hourlyRate;
    this.career = career;
    this.requirements = requirements;
    this.description = description;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get hourlyRate(): number {
    return this._hourlyRate;
  }

  set hourlyRate(value: number) {
    this._hourlyRate = value;
  }

  get careerLevel(): number {
    return this._careerLevel;
  }

  set careerLevel(value: number) {
    this._careerLevel = value;
  }

  get totalExp(): number {
    return this._totalExp;
  }

  set totalExp(value: number) {
    this._totalExp = value;
  }

  get currentExp(): number {
    return this._currentExp;
  }

  set currentExp(value: number) {
    this._currentExp = value;
  }

  get career(): string {
    return this._career;
  }

  set career(value: string) {
    this._career = value;
  }

  get requirements(): Requirement[] {
    return this._requirements;
  }

  set requirements(value: Requirement[]) {
    this._requirements = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
