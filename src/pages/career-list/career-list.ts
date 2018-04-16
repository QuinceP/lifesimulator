import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CareerService } from '../../services/career-service';
import { PlayerService } from '../../services/player-service';
import { CareerDetailPage } from '../career-detail/career-detail';
import { Career } from '../../models/career';
import { TimeService } from '../../services/time-service';
import { Lumberjack } from '../../services/lumberjack';

@Component({
  selector: 'page-career-list',
  templateUrl: 'career-list.html',
})
export class CareerListPage {
  careers: Career[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public careerSvc: CareerService,
              public playerSvc: PlayerService,
              public timeSvc: TimeService,
              public lumberjack: Lumberjack) {
  }

  ionViewCanEnter(){
    this.careers = this.careerSvc.Careers;
  }

  highestLevel(career: Career) {
    let c = this.playerSvc.player.pastCareers.find(c => c.title === career.title);
    if (c){
      return c.highestLevel;
    }
    else {
      return 0;
    }
  }

  goToCareerDetail(career: Career) {
    this.navCtrl.push(CareerDetailPage, {
      career: career
    })
  }
}
