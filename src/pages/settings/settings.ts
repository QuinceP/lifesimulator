import { Component, OnInit } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '../../utilities/translate/translate-service';
import { SettingsService } from '../../services/settings-service';
import { Themes } from '../../utilities/helpers';
import { environment } from '../../environments/environment';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {
  selectedTheme: string;
  themes: string[] = [];
  version: string = environment.version;
  codename: string = environment.codename;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateSvc: TranslateService,
    public settingsSvc: SettingsService,
    public events: Events) {

    this.themes = this.makeEnum(Themes);
    this.settingsSvc.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  ngOnInit() {
    this.version = environment.version;
    this.codename = environment.codename;
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

  presentUpdateAlert(){
    this.events.publish('presentUpdateAlert');
  }
}
