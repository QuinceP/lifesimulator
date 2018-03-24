import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CareerService } from '../../services/career-service';
import { PlayerService } from '../../services/player-service';
import { CareerDetailPage } from '../career-detail/career-detail';
import { Career } from '../../models/career';
import { TimeService } from '../../services/time-service';

@Component({
  selector: 'page-career-list',
  templateUrl: 'career-list.html',
})
export class CareerListPage {
  careers: Career[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public careerSvc: CareerService, public playerSvc: PlayerService, public timeSvc: TimeService) {
    this.careers = this.careerSvc.Careers;
  }

  highestLevel(career: Career) {
    if (this.playerSvc.player.pastCareers.indexOf(career) > -1) {
      let i = this.playerSvc.player.pastCareers.indexOf(career);
      return this.playerSvc.player.pastCareers[i].highestLevel;
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
