import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import $ from "jquery";
import { Lumberjack } from '../../services/lumberjack';


@Component({
  selector: 'page-casino',
  templateUrl: 'casino.html',
})
export class CasinoPage {
  num1: number = 123;
  num2: number = 456;
  num3: number = 789;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public lumberjack: Lumberjack) {
  }

  ionViewWillEnter() {
    this.spin();
  }

  setSymbols() {
    setTimeout(() => {
      $('.odometer-digit-inner .odometer-ribbon .odometer-ribbon-inner .odometer-value').each((index, element) => {
        let number: string = $(element).text();
        switch (number) {
          case '1':
            $(element).text('🍒');
            break;
          case '2':
            $(element).text('🍇');
            break;
          case '3':
            $(element).text('🍬');
            break;
          case '4':
            $(element).text('🍊');
            break;
          case '5':
            $(element).text('🍍');
            break;
          case '6':
            $(element).text('7');
            break;
          case '7':
            $(element).text('💎');
            break;
          case '8':
            $(element).text('🍋');
            break;
          case '9':
            $(element).text('🍐');
            break;
        }
      });
    }, 0)
  }

  spin() {
    let min = 1;
    let max = 9;

    let numbers: number[] = [];

    for (let i: number = 0; i < 3; i++) {
      let hundreds = (Math.floor(Math.random() * (max - min)) + min) * 100;
      let tens = (Math.floor(Math.random() * (max - min)) + min) * 10;
      let ones = (Math.floor(Math.random() * (max - min)) + min);
      numbers.push(hundreds + tens + ones);
    }

    this.num1 = numbers[0];
    this.num2 = numbers[1];
    this.num3 = numbers[2];
    // this.setSymbols();
    // setTimeout(() => {
    //   this.setSymbols()
    // }, 2100);
  }
}
