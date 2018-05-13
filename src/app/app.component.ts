import { Component } from '@angular/core';
import { AlertController, Events, Platform } from 'ionic-angular';
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
import { SettingsService } from '../services/settings-service';
import { BugReportService } from '../services/bug-report-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabPage;
  selectedTheme: string;

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
    public gameplayStatsSvc: GameplayStatsService,
    public settingsSvc: SettingsService,
    public bugSvc: BugReportService,
    public events: Events) {

    events.subscribe('presentUpdateAlert', () => {
      this.showAlert();
    });

    this.settingsSvc.getActiveTheme().subscribe(val => {
      this.selectedTheme = val;
      this.lumberjack.info('changed theme to', this.selectedTheme);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      this.load().then(() => {
        this.adService.showBanner();
        splashScreen.hide();
        this.presentUpdateAlert();
      });
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
    this.saveService.load('version').then((result) => {
      this.lumberjack.info('saved version', result, 'current version', environment.version);
      if (!result || result != environment.version) {
          this.showAlert();
          this.saveService.save('version', environment.version);

      }
    })
  }

  showAlert(){
    this.alertCtrl.create({
      title: 'Welcome to Untitled Life Sim ',
      message: 'Update Notes v' + environment.version + '&nbsp;' + '\"' + environment.codename + '\"' + '\n\n' +
      'New Features' + '\n' +
      '&nbsp;&#8226;&nbsp;Added dynamic theming - choose light, dark or default themes in settings' + '\n' +
      '&nbsp;&#8226;&nbsp;Careers update' + '\n' +
      '&nbsp;&#8226;&nbsp;Added Music, Military, and Education careers' + '\n' +
      '&nbsp;&#8226;&nbsp;Careers update' + '\n' +
      '&nbsp;&#8226;&nbsp;Added Pedagogy skill' + '\n' +
      '&nbsp;&#8226;&nbsp;Added level up notification when training skills' + '\n' +
      '&nbsp;&#8226;&nbsp;Business skill now has a bonus tied to Charisma' + '\n' +'\n' +
      'Enhancements' + '\n' +
      "&nbsp;&#8226;&nbsp;Allow redisplaying version notes in settings" + '\n' +
      "&nbsp;&#8226;&nbsp;Moved transaction success toast to top" + '\n' +
      "&nbsp;&#8226;&nbsp;Gameplay stats update" + '\n' +
      "&nbsp;&nbsp;&#8226;&nbsp;Added more tracked stats (all/life time):" + '\n' +
      "&nbsp;&nbsp;&nbsp;&#8226;&nbsp;Hours Worked" + '\n' +
      "&nbsp;&nbsp;&nbsp;&#8226;&nbsp;Times Eaten" + '\n' +
      "&nbsp;&nbsp;&nbsp;&#8226;&nbsp;Times Had Fun" + '\n' +
      "&nbsp;&nbsp;&nbsp;&#8226;&nbsp;Times Healed" + '\n' +
      "&nbsp;&nbsp;&nbsp;&#8226;&nbsp;Death" + '\n' + '\n' +
      'Bug Fixes' + '\n' +
      "&nbsp;&nbsp;&#8226;&nbsp;Fixed player stat rounding error" + '\n' +
      "&nbsp;&nbsp;&#8226;&nbsp;Fixed bug where skills did not reset on death" + '\n' +
      "&nbsp;&nbsp;&#8226;&nbsp;Fixed bug that crashed the player page and granted player immortality",
      buttons: [{ text: 'Ok' },
      ],
      cssClass: 'prewrap'
    }).present();
  }
}
