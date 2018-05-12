import { Injectable } from '@angular/core';
import { SaveService } from './save-service';
import { Lumberjack } from './lumberjack';

export interface GameplayStat {
  text: string;
  count: number;
  allTime?: boolean;
  type?: string;
}

export const GameplayStatNames = {
  Death: "Death",
  MoneyEarned: "MoneyEarned",
  MoneyEarnedAllTime: "MoneyEarnedAllTime",
  HoursWorked: "HoursWorked",
  HoursWorkedAllTime: "HoursWorkedAllTime",
  TimesEaten: "TimesEaten",
  TimesEatenAllTime: "TimesEatenAllTime",
  TimesHadFun: "TimesHadFun",
  TimesHadFunAllTime: "TimesHadFunAllTime",
  TimesHealed: "TimesHealed",
  TimesHealedAllTime: "TimesHealedAllTime",
};

@Injectable()
export class GameplayStatsService {
  saveKey: string = 'game_stats';
  constructor(protected saveSvc: SaveService,
              public lumberjack: Lumberjack){
    this.stats = this.defaultStats;
  }
  public StatNames = GameplayStatNames;

  public stats: { [index: string]: GameplayStat };
  public defaultStats: { [index: string]: GameplayStat } = {
    "Death": { text: 'died', count: 0, allTime: true, type: 'number'},
    "MoneyEarned": { text: 'money earned', count: 0, type: 'cash'},
    "MoneyEarnedAllTime": { text: 'money earned', count: 0, allTime: true, type: 'cash'},
    "TimesEaten": { text: 'times eaten', count: 0, type: 'number'},
    "TimesEatenAllTime": { text: 'times eaten', count: 0, allTime: true, type: 'number'},
    "TimesHadFun": { text: 'had fun', count: 0, type: 'number'},
    "TimesHadFunAllTime": { text: 'had fun', count: 0, allTime: true, type: 'number'},
    "TimesHealed": { text: 'doctor visits', count: 0, type: 'number'},
    "TimesHealedAllTime": { text: 'doctor visits', count: 0, allTime: true, type: 'number'},
    "HoursWorked": { text: 'hours worked', count: 0, type: 'number'},
    "HoursWorkedAllTime": { text: 'hours worked', count: 0, allTime: true, type: 'number'}
  };

  setStat(statName: string, value: number) {
    this.stats[statName].count += value;
  }

  resetLifetimeStats(){
    for (let i in this.stats){
      let stat = this.stats[i];
      if (!stat.allTime){
        // this.lumberjack.info(stat.text, 'All Time:', stat.allTime);
        this.stats[i].count = 0;
      }
    }
  }

  load(): Promise<any>{
    return this.saveSvc.load(this.saveKey).then((val)=>{
      if (val){
        this.lumberjack.info(this.saveKey + ' loaded.');
        this.lumberjack.info(val);
        this.stats = val as { [index: string]: GameplayStat };
      }
      else {
        this.lumberjack.warn(this.saveKey + ' not loaded.');
      }
    }).catch((error)=> {
      this.lumberjack.error(error);
    });
  }

  save(){
    let value = this.stats;
    this.saveSvc.save(this.saveKey,  value).then((val) => {
      this.lumberjack.info(this.saveKey + ' saved successfully ' + new Date().toUTCString());
    }).catch((error) => {
      this.lumberjack.error('Could not save ' + this.saveKey +'.');
      this.lumberjack.error(error);
    })
  }
}
