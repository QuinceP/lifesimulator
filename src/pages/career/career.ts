import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PlayerService } from '../../services/player-service';
import { Person } from '../../models/person';
import { CareerListPage } from '../career-list/career-list';
import { TimeService } from '../../services/time-service';
import { CareerService } from '../../services/career-service';
import { Action } from '../../models/action';
import { GameplayStatsService } from '../../services/gameplay-stats-service';
import { Lumberjack } from '../../services/lumberjack';

@Component({
  selector: 'page-career',
  templateUrl: 'career.html',
})
export class CareerPage implements OnInit{
  private player: Person;
  private unemployed = 'job-title-unemployed-1';
  private background_color: string;
  @ViewChildren('workButton') workButtons: QueryList<ElementRef>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private playerSvc: PlayerService,
              private timeSvc: TimeService,
              private toastCtrl: ToastController,
              private careerSvc: CareerService,
              private statSvc: GameplayStatsService,
              private changeDetectorRef: ChangeDetectorRef,
              public lumberjack: Lumberjack) {
  }

  ngOnInit(){
    this.getBackgroundColor();
  }
  ionViewCanEnter(){
    this.player = this.playerSvc.player;
    this.lumberjack.info(this.playerSvc);
    this.lumberjack.info(this.player);
  }

  goToCareersList() {
    this.navCtrl.push(CareerListPage);
  }

  work(hours: number = 1) {
    let earned = hours * this.player.job.hourlyRate;
    let workAction = new Action('Work', hours, () => {
      this.player.money += earned;
      this.statSvc.setStat(this.statSvc.StatNames.MoneyEarned, earned);
      this.statSvc.setStat(this.statSvc.StatNames.MoneyEarnedAllTime, earned);
      this.statSvc.setStat(this.statSvc.StatNames.HoursWorked, hours);
      this.statSvc.setStat(this.statSvc.StatNames.HoursWorkedAllTime, hours);
    });

    this.timeSvc.performTimedAction(workAction, hours);

    this.toastCtrl.create({
      message: '+ $' + earned,
      duration: 300,
      position: 'top'
    }).present();
  }

  getBackgroundColor() {
    this.lumberjack.info(this.player.career.color);
    this.background_color = this.player.career.color == "#000000" ? '#ffffff' : this.player.career.color;
    return this.background_color;
  }
}
