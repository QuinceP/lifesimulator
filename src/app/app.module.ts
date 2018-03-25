import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlayerService } from '../services/player-service';
import { ProgressBarModule } from 'angular-progress-bar';
import { CareerPage } from '../pages/career/career';
import { CareerListPage } from '../pages/career-list/career-list';
import { CareerService } from '../services/career-service';
import { CareerDetailPage } from '../pages/career-detail/career-detail';
import { TimeService } from '../services/time-service';
import { FinancePage } from '../pages/finance/finance';
import { FinanceService } from '../services/finance-service';
import { SocialPage } from '../pages/social/social';
import { HousingPage } from '../pages/housing/housing';
import { HousingService } from '../services/housing-service';
import { EducationPage } from '../pages/education/education';
import { SkillsPage } from '../pages/skills/skills';
import { SkillService } from '../services/skill-service';
import { CasinoPage } from '../pages/casino/casino';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { TabPage } from '../pages/tab/tab';
import { TranslateService } from '../utilities/translate/translate-service';
import { TranslatePipe } from '../utilities/translate/translate-pipe';
import { SettingsPage } from '../pages/settings/settings';
import { Lumberjack } from '../services/lumberjack';
import { ConsoleLoggerService } from '../services/console-logger-service';
import { StatusComponent } from '../components/status-bar/status-bar';
import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    TabPage,
    MenuPage,
    HomePage,
    CareerPage,
    FinancePage,
    CareerListPage,
    CareerDetailPage,
    SocialPage,
    HousingPage,
    EducationPage,
    SkillsPage,
    CasinoPage,
    SettingsPage,
    TranslatePipe,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {mode: 'md'}),
    ProgressBarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabPage,
    MenuPage,
    HomePage,
    CareerPage,
    FinancePage,
    CareerListPage,
    CareerDetailPage,
    SocialPage,
    HousingPage,
    EducationPage,
    SkillsPage,
    CasinoPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: Lumberjack, useClass: ConsoleLoggerService },
    PlayerService,
    CareerService,
    TimeService,
    FinanceService,
    HousingService,
    SkillService,
    TranslateService
  ]
})
export class AppModule {
}
