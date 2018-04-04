import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { Person } from '../../models/person';
import { CareerListPage } from '../career-list/career-list';
import { TimeService } from '../../services/time-service';
import { CareerService } from '../../services/career-service';
import { Action } from '../../models/action';

@Component({
  selector: 'page-career',
  templateUrl: 'career.html',
})
export class CareerPage {
  private player: Person;
  @ViewChildren('workButton') workButtons: QueryList<ElementRef>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private playerSvc: PlayerService,
              private timeSvc: TimeService,
              private toastCtrl: ToastController,
              private careerSvc: CareerService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.player = this.playerSvc.player;
  }

  goToCareersList() {
    this.navCtrl.push(CareerListPage);
  }

  work(hours: number = 1) {
    let earned = hours * this.player.job.hourlyRate;
    let workAction = new Action('Work', hours, () => {
      this.player.money += earned;
    });

    this.timeSvc.performTimedAction(workAction, hours);

    this.toastCtrl.create({
      message: '+ $' + earned,
      duration: 500,
      position: 'top'
    }).present();
  }
}
