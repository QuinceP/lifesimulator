import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabPage } from '../pages/tab/tab';
import { TranslateService } from '../utilities/translate/translate-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    });
  }
}
