import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { Lumberjack } from './lumberjack';
import { Platform } from 'ionic-angular';

@Injectable()

export class AdService {
  constructor(public adMob: AdMobFree,
              public lumberjack: Lumberjack,
              public platform: Platform) {

  }

  showBanner() {
    if (this.platform.is('cordova') && !this.platform.is('browser')){
      let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: true, // Remove in production
        autoShow: true
        //id: Your Ad Unit ID goes here
      };

      this.adMob.banner.config(bannerConfig);

      this.adMob.banner.prepare().then(() => {
        // success
      }).catch(e => this.lumberjack);
    }
  }

  launchInterstitial() {

    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: true, // Remove in production
      autoShow: true
      //id: Your Ad Unit ID goes here
    };

    this.adMob.interstitial.config(interstitialConfig);

    this.adMob.interstitial.prepare().then(() => {
      // success
    });

  }
}
