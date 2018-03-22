import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CareerService } from '../../services/career-service';
import { PlayerService } from '../../services/player-service';
import { CareerDetailPage } from '../career-detail/career-detail';
import { Career } from '../../models/career';
import { TimeService } from '../../services/time-service';

/**
 * Generated class for the CareerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-career-list',
  templateUrl: 'career-list.html',
})
export class CareerListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public careerSvc: CareerService, public playerSvc: PlayerService, public timeSvc: TimeService) {
  }

  highestLevel(career: Career){
    if (this.playerSvc.player.pastCareers.indexOf(career) > -1) {
      let i = this.playerSvc.player.pastCareers.indexOf(career);
      return this.playerSvc.player.pastCareers[i].highestLevel;
    }
    else {
      return 0;
    }
  }

  ionViewDidLoad() {
  }

  goToCareerDetail(career: Career) {
    this.navCtrl.push(CareerDetailPage, {
      career: career
    })
  }
}
