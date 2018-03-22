import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';

/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public timeSvc: TimeService) {
  }

}
