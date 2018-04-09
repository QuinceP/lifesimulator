import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameplayStat, GameplayStatsService } from '../../services/gameplay-stats-service';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  stats: GameplayStat[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public statsSvc: GameplayStatsService) {
  }

  ionViewDidEnter(): void {
    this.getStats();
  }

  getStats(): void {
    this.stats = [];
    for (let key of Object.keys(this.statsSvc.stats)){
      this.stats.push(this.statsSvc.stats[key]);
    }
  }
}
