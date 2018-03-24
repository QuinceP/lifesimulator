import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';
import { HomePage } from '../home/home';
import { CareerPage } from '../career/career';
import { FinancePage } from '../finance/finance';
import { SkillsPage } from '../skills/skills';
import { HousingPage } from '../housing/housing';
import { SocialPage } from '../social/social';
import { EducationPage } from '../education/education';
import { CasinoPage } from '../casino/casino';
import { SettingsPage } from '../settings/settings';
import { TranslateService } from '../../utilities/translate/translate-service';
import { Lumberjack } from '../../services/lumberjack';

interface MenuItem {
  page: any;
  name: string;
  icon: string;
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  pages: MenuItem[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public timeSvc: TimeService,
              public translateSvc: TranslateService,
              public lumberjack: Lumberjack) {
    this.pages = [
      { page: HomePage, name: 'Me', icon: 'person' },
      { page: CareerPage, name: 'Career', icon: 'briefcase' },
      { page: FinancePage, name: 'Finance', icon: 'cash' },
      { page: SkillsPage, name: 'Skills', icon: 'bulb' },
      { page: HousingPage, name: 'Housing', icon: 'home' },
      { page: SocialPage, name: 'Social', icon: 'people' },
      { page: EducationPage, name: 'Education', icon: 'school' },
      { page: CasinoPage, name: 'Casino', icon: 'game-controller-a' },
      { page: SettingsPage, name: 'Settings', icon: 'settings' }
    ]
  }
}
