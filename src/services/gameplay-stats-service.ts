import { Injectable } from '@angular/core';

export interface GameplayStat {
  name: string;
  text: string;
  count: number;
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
    "Death": { name: 'death', text: 'died', count: 0 },
    "MoneyEarned": { name: 'money earned', text: 'money earned', count: 0 },
  };

  setStat(statName: string, value: number) {
    this.stats[statName].count += value;
  }
}
