import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../utilities/translate/translate-service';
import { SettingsService } from '../../services/settings-service';
import { Themes } from '../../utilities/helpers';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  selectedTheme: string;
  themes: string[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateSvc: TranslateService,
    public settingsSvc: SettingsService) {

    this.themes = this.makeEnum(Themes);
    this.settingsSvc.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  setActiveTheme(theme: string) {
    this.settingsSvc.setActiveTheme(theme);
  }

  makeEnum(enumObject) {
    let all: string[] = [];
    for (let key in enumObject) {
      all.push(enumObject[key]);
    }
    return all;
  }

  getThemeDisplayName(theme: string){
    return theme.replace("-theme", "").toTitleCase();
  }
}
