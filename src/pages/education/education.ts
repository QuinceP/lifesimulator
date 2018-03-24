import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';

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
