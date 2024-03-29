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
import { PlayerService } from '../../services/player-service';
import { ShoppingPage } from '../shopping/shopping';
import { StatsPage } from '../stats/stats';
import { AdService } from '../../services/ad-service';
import { Person } from '../../models/person';
import { MyApp } from '../../app/app.component';
import { SaveService } from '../../services/save-service';
import { CareerService } from '../../services/career-service';
import { FinanceService } from '../../services/finance-service';
import { SkillService } from '../../services/skill-service';
import { BugReportPage } from '../bug-report/bug-report';
import { environment } from '../../environments/environment';

/**
 * An item on the main menu, containing its display and navigation properties.
 */
interface MenuItem {
  page: any;
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  pages: MenuItem[];
  version: string = environment.version;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public timeSvc: TimeService,
              public translateSvc: TranslateService,
              public lumberjack: Lumberjack,
              public playerSvc: PlayerService,
              public adService: AdService, public careerSvc: CareerService,
              public skillSvc: SkillService, public finSvc: FinanceService) {

    this.pages = [
      { page: HomePage, name: 'Me', icon: 'person', color: "primary" },
      { page: CareerPage, name: 'Career', icon: 'briefcase', color: "secondary" },
      { page: FinancePage, name: 'Finance', icon: 'cash', color: "primary" },
      { page: SkillsPage, name: 'Skills', icon: 'bulb', color: "warning" },
      { page: HousingPage, name: 'Housing', icon: 'home', color: "warning" },
      // { page: SocialPage, name: 'Social', icon: 'people', color: "secondary" },
      // { page: EducationPage, name: 'Education', icon: 'school', color: "danger" },
      // { page: CasinoPage, name: 'Casino', icon: 'game-controller-a', color: "warning" },
      { page: ShoppingPage, name: 'Shopping', icon: 'pricetags', color: "secondary" },
      { page: StatsPage, name: 'Stats', icon: 'stats', color: "danger" },
      { page: SettingsPage, name: 'Settings', icon: 'settings', color: "primary" },
      { page: BugReportPage, name: 'Report Bug', icon: 'bug', color: "danger" },
    ]
  }

}
