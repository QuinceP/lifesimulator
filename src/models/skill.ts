import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

export const EXP_CONSTANT = 0.1;

export class Skill {
  private _name: string;
  private _icon: string;
  private _level: number;
  private _currentExp: number;
  private _totalExp: number;
  private _action: string;
  private _color: string;

  private levelUpObserver: Observable<any>;

  constructor(name: string, icon: string, action: string, color: string){
    this.name = name;
    this.icon = icon;
    this.currentExp = 0;
    this.action = action;
    this.color = color;
    this.level = 0;
    this.totalExp = this.calcExp(0);
  }

  calcExp(level: number){
    return Math.ceil((level/EXP_CONSTANT)**2);
  }
  calcLevel(exp: number){
    return Math.ceil(EXP_CONSTANT * Math.sqrt(exp));
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get currentExp(): number {
    return this._currentExp;
  }

  set currentExp(value: number) {
    this._currentExp = value;
    this.checkExp();
  }

  get totalExp(): number {
    return this._totalExp;
  }

  set totalExp(value: number) {
    this._totalExp = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  checkExp(){
    if (this.currentExp >= this.totalExp){
      this.level = this.calcLevel(this.currentExp);
      this.totalExp = this.calcExp(this.level);
      this.getStartingExpToNextLevel();
    }
  }

  getExpToNextLevel(){
    return this.totalExp - this.currentExp;
  }

  getStartingExpToNextLevel(){
    return this.calcExp(this.level) - this.calcExp(this.level - 1);
  }
}
