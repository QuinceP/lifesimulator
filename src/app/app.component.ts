import { Component } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabPage } from '../pages/tab/tab';
import { PlayerService } from '../services/player-service';
import { Lumberjack } from '../services/lumberjack';
import { SaveService } from '../services/save-service';
import { CareerService } from '../services/career-service';
import { SkillService } from '../services/skill-service';
import { FinanceService } from '../services/finance-service';
import { AdService } from '../services/ad-service';
import { environment } from '../environments/environment';
import { GameplayStatsService } from '../services/gameplay-stats-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabPage;


  constructor(
    platform: Platform,
    statusBar: StatusBar, splashScreen: SplashScreen,
    public playerSvc: PlayerService,
    public lumberjack: Lumberjack,
    public saveService: SaveService,
    public careerSvc: CareerService,
    public skillSvc: SkillService,
    public finSvc: FinanceService,
    public adService: AdService,
    public alertCtrl: AlertController,
    public gameplayStatsSvc: GameplayStatsService) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      this.load().then(() => {
        this.adService.showBanner();
        splashScreen.hide();
        this.presentUpdateAlert();
      });


      // if (platform.is('cordova')) {
      // }
      // else {
      //   this.lumberjack.info('Player not loaded.');
      // }
    });
  }

  load(): Promise<any[]> {
    return Promise.all([
        this.skillSvc.load(),
        this.careerSvc.load(),
        this.playerSvc.load(),
        this.finSvc.load(),
        this.gameplayStatsSvc.load()
      ]
    )
  }

  presentUpdateAlert() {
    this.saveService.load('shown_update').then((result) => {
      if (!result) {
        this.alertCtrl.create({
          title: 'Welcome to Untitled Life Sim',
          message: 'Update Notes v' + environment.version + '\n\n' +
          '&#8226;&nbsp;Added saving' + '\n' +
          '&#8226;&nbsp;Added bug reports to menu' + '\n' +
          '&#8226;&nbsp;Added test ads' + '\n',
          buttons: [{ text: 'Ok' },
          ],
          cssClass: 'prewrap'
        }).present();
        this.saveService.save('shown_update', true);
      }
    })
  }
}
