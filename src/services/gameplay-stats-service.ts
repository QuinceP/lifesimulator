import { Injectable } from '@angular/core';

export interface GameplayStat {
  name: string;
  text: string;
  count: number;
  type?: string;
}

export const GameplayStatNames = {
  Death: "Death",
  MoneyEarned: "MoneyEarned"
};

@Injectable()
export class GameplayStatsService {
  public StatNames = {
    Death: "Death",
    MoneyEarned: "MoneyEarned"
  };

  public stats: { [index: string]: GameplayStat } = {
    "Death": { name: 'death', text: 'died', count: 0, type: 'number'},
    "MoneyEarned": { name: 'money earned', text: 'money earned', count: 0, type: 'cash'},
    // "TimesEaten": { name: 'times eaten', text: 'times eaten', count: 0, type: 'cash'},
    // "TimesHadFun": { name: 'had fun', text: 'had fun', count: 0, type: 'cash'},
    // "Times": { name: 'had fun', text: 'had fun', count: 0, type: 'cash'},
  };

  setStat(statName: string, value: number) {
    this.stats[statName].count += value;
  }
}
