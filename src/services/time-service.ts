import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Action } from '../models/action';
import { PlayerService } from './player-service';
import { Lumberjack } from './lumberjack';

/**
 * Hours needed to decrease hunger stat from 100 to 0.
 * @type {number}
 */
const STARVATION_HOURS: number = 48; //half week

/**
 * Hours needed to decrease mood stat from 100 to 0.
 * @type {number}
 */
const SUICIDE_HOURS: number = 48 * 3;

/**
 * Hours needed to decrease health stat from 100 to 0.
 * @type {number}
 */
const FATAL_HEALTH_HOURS: number = 48 * 4;

/**
 * Class to manage and advance the in-game clock.
 */
@Injectable()
export class TimeService {
  private _date: moment.Moment;
  private _startDate: moment.Moment;
  private _years: number = 0;
  private _days: number = 0;

  constructor(private playerSvc: PlayerService, protected lumberjack: Lumberjack) {
    this.date = moment();
    this.date.hour(0).minute(0).second(0).millisecond(0);
    this.startDate = moment(this.date);
  }

  get years(): number {
    return this._years;
  }

  set years(value: number) {
    this._years = value;
  }

  get date(): moment.Moment {
    return this._date;
  }

  set date(value: moment.Moment) {
    this._date = value;
  }

  get startDate(): moment.Moment {
    return this._startDate;
  }

  set startDate(value: moment.Moment) {
    this._startDate = value;
  }

  get days(): number {
    return this._days;
  }

  set days(value: number) {
    this._days = value;
  }

  getDays() {
    this.days = this.date.diff(this.startDate, 'days');
  }

  static starvationRate(): number{
    return +((100 / STARVATION_HOURS).toFixed(2));
  }

  static healthRate(): number{
    return +((100 / FATAL_HEALTH_HOURS).toFixed(2));
  }
  static depressionRate(): number{
    return +((100 / SUICIDE_HOURS).toFixed(2));
  }

  performTimedAction(action: Action, actionCount: number = 1) {
    this.playerSvc.player.hunger -= Math.floor(TimeService.starvationRate() * action.durationInHours);
    this.playerSvc.player.health -= Math.floor(TimeService.healthRate() * action.durationInHours);
    this.playerSvc.player.mood -= Math.floor(TimeService.depressionRate() * action.durationInHours);
    action.act(actionCount).then(() => {
        this.date.add(action.durationInHours, 'hours');
        this.getDays();
        if(this.playerSvc.player.health <= 0|| this.playerSvc.player.hunger <= 0 || this.playerSvc.player.mood <= 0){
          this.playerSvc.die();
        }
      },
      (err) => {
        this.lumberjack.error(err);
      });
  }
}
