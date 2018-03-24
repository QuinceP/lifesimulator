import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
