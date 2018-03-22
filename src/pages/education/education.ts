import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';

/**
 * Generated class for the EducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-education',
  templateUrl: 'education.html',
})
export class EducationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public timeSvc: TimeService) {
  }

  ionViewDidLoad() {
  }

}
