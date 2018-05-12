import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameplayStat, GameplayStatsService } from '../../services/gameplay-stats-service';
import { CurrencyPipe } from '@angular/common';
import { PlayerService } from '../../services/player-service';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  stats: GameplayStat[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public statsSvc: GameplayStatsService,
              public currencyPipe: CurrencyPipe,
              public playerSvc: PlayerService) {
  }

  ionViewDidEnter(): void {
    this.getStats();
  }

  getStats(): void {
    this.stats = [];
    for (let key of Object.keys(this.statsSvc.stats)) {
      this.stats.push(this.statsSvc.stats[key]);
    }
  }

  getStatValue(stat: GameplayStat): string {
    if (stat.type == 'cash') {
      return this.currencyPipe.transform(stat.count, 'USD', true, '1.2-2')
    }
    return String(stat.count);
  }

  getStatDisplay(stat: GameplayStat): string {
    let qualifier = stat.allTime ? ' (All Time)': '';
    return stat.text.toTitleCase() + qualifier;
  }
}
