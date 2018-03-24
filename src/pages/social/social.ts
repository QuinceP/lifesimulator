import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';

@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public timeSvc: TimeService) {
  }
}
