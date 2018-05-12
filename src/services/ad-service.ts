import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Lumberjack } from './lumberjack';
import { Platform } from 'ionic-angular';
import { environment } from '../environments/environment';

@Injectable()

export class AdService {
  constructor(public adMob: AdMobFree,
              public lumberjack: Lumberjack,
              public platform: Platform) {

  }

  showBanner() {
    if (this.platform.is('cordova') && !this.platform.is('core')){
      let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: environment.production == false, // Remove in production
        autoShow: true
        //id: Your Ad Unit ID goes here
      };

      this.adMob.banner.config(bannerConfig);

      this.adMob.banner.prepare().then(() => {
        this.lumberjack.info('Banner launched.');
      }).catch(e => this.lumberjack.error(e));
    }
  }

  launchInterstitial() {
    if (this.platform.is('cordova') && !this.platform.is('core')) {

      let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: true, // Remove in production
        autoShow: true
        //id: Your Ad Unit ID goes here
      };

      this.adMob.interstitial.config(interstitialConfig);

      this.adMob.interstitial.prepare().then(() => {
        // success
        this.lumberjack.info('Interstitial launched.');
      });

    }
  }
}
