import { Injectable } from '@angular/core';
import { _translations } from './translation'; // import our opaque token

@Injectable()
export class TranslateService {
  private _currentLang: string;
  public translatedText: string;
  public supportedLanguages: any[];

  public get currentLang() {
    return this._currentLang;
  }

  // inject our translations
  constructor() {
    // standing data
    this.supportedLanguages = [
      { display: 'English', value: 'en' },
      { display: 'Español', value: 'es' },
      { display: '华语', value: 'zh' },
    ];

    // set current language
    this.selectLang('en');
  }

  public use(lang: string): void {
    // set current language
    this._currentLang = lang;
  }

  private translate(key: string): string {
    // private perform translation
    let translation = key;

    if (_translations[this.currentLang] && _translations[this.currentLang][key]) {
      return _translations[this.currentLang][key];
    }

    return translation;
  }

  public instant(key: string) {
    // call translation
    return this.translate(key);
  }

  isCurrentLang(lang: string) {
    // check if the selected lang is current lang
    return lang === this.currentLang;
  }

  selectLang(lang: string) {
    this.use(lang);
  }
}
