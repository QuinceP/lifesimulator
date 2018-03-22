import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CasinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-casino',
  templateUrl: 'casino.html',
})
export class CasinoPage {
  private drinks = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
  private prev = -1;
  @ViewChild('equation') equation;
  @ViewChild('arm') arm;
  private clicked: string = '';
  private equationClass: string = 'done';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
  }

}
