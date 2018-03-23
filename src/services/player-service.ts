import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { countries } from '../models/country';
import { Helpers } from '../utilities/helpers';
import CountryLanguage from 'country-language';
import faker from 'faker';
import { Lumberjack } from './lumberjack';
import { AlertController } from 'ionic-angular';
import { CareerService } from './career-service';



/**
 * Class to provide player data.
 */
@Injectable()
export class PlayerService {
  public player: Person;

  /**
   * Births a new player upon initializing.
   * @param {Lumberjack} lumberjack
   * @param {AlertController} alertCtrl
   */
  constructor(protected lumberjack: Lumberjack,
              protected alertCtrl: AlertController,
              protected careerSvc: CareerService) {
    this.birth();
  }

  /**
   * The player object.
   * @returns {Person}
   */
  getPlayer() {
    return this.player;
  }

  /**
   * Generates a new Player.
   */
  birth() {
    let country = PlayerService.randomCountry();
    this.player = new Person();
    this.generateName(country);
    this.player.nationality = country.Name;
    this.player.age = 18;
    this.player.money = 100;
    this.player.mood = 85;
    this.player.hunger = 85;
    this.player.health = 85;
    this.player.appearance = Helpers.weightedRandom(100, 2);
    this.player.intelligence = Helpers.weightedRandom(100, 2);
    this.player.agility = Helpers.weightedRandom(100, 2);
    this.player.charisma = Helpers.weightedRandom(100, 2);
    this.player.dexterity = Helpers.weightedRandom(100, 2);
    this.player.strength = Helpers.weightedRandom(100, 2);
    this.player.career = this.careerSvc.Software;
    this.player.pastCareers.push(this.careerSvc.Software);
    this.lumberjack.info(this.player.pastCareers);
    this.player.pastCareers[0].highestLevel = 1;
    this.player.job = this.careerSvc.Software.jobs[0];
    this.showBirthAlert();
  }

  showBirthAlert() {
    let alert = this.alertCtrl.create({
      message: 'Your name is ' + this.player.firstName + ' ' +
      this.player.lastName + '. You were born in '
      + this.player.nationality + '.',
      buttons: [{
        text: 'Dismiss',
        cssClass: 'game-alert'
      }],
    }).present();
  }

  /**
   * Action to take when player dies.
   */
  die() {
    this.lumberjack.info('Player has perished.');
    let alert = this.alertCtrl.create({
      message: 'You died.',
      buttons: [{
        text: 'Dismiss',
        cssClass: 'game-alert'
      }],
    });
    alert.present();
  }

  /**
   * Returns a random CountryIdentifier.
   * @returns {CountryIdentifier}
   */
  static randomCountry(): CountryIdentifier {
    return countries[Math.floor(Math.random() * countries.length)];
  }

  /**
   * Returns an array of language locale strings for a given country.
   * @param country
   * @returns {string[]}
   */
  static languageStrings(country): string[] {
    let languages = country.languages;
    let languageStrings = [];
    for (let language of languages) {
      if (supportedLocales.indexOf(language.iso639_1) != -1) {
        languageStrings.push(language.iso639_1);
      }
    }
    return languageStrings;
  }

  /**
   * Returns a list of names from each given language.
   * @param {string[]} languageStrings
   * @returns {FullName[]}
   */
  static names(languageStrings: string[]) {
    let names: FullName[] = [];
    for (let languageString of languageStrings) {
      faker.locale = languageString;
      let name: FullName = { firstName: faker.fake("{{name.firstName}}"), lastName: faker.fake("{{name.lastName}}") };
      names.push(name);
    }
    return names;
  }

  /**
   * Generates a random name given a CountryIdentifier and sets it as the player name.
   * @param {CountryIdentifier} countryIdentifier
   */
  generateName(countryIdentifier: CountryIdentifier) {
    CountryLanguage.getCountry(countryIdentifier.Code, (err, country: { languages: string[] }) => {
      if (err) {
        this.lumberjack.info(err);
      }
      else {
        let languageStrings: string[] = PlayerService.languageStrings(country);
        if (typeof languageStrings == 'undefined' || languageStrings.length < 1) {
          languageStrings = ['en'];
        }
        let names = PlayerService.names(languageStrings);
        let name = names[Math.floor(Math.random() * names.length)];
        this.player.firstName = name.firstName;
        this.player.lastName = name.lastName;
      }
    });
  }
}

/**
 * An interface containing a random country string and its country code.
 */
export interface CountryIdentifier {
  Code: string;
  Name: string;
}

/**
 * An interface to describe a full name.
 */
export interface FullName {
  firstName: string;
  lastName: string;
}

/**
 * Supported language locales for the application.
 * @type {string[]}
 */
export const supportedLocales = [
  'az',
  'cz',
  'de',
  'de_AT',
  'de_CH',
  'en',
  'en_AU',
  'en_BORK',
  'en_CA',
  'en_GB',
  'en_IE',
  'en_IND',
  'en_US',
  'en_au_ocker',
  'es',
  'es_MX',
  'fa',
  'fr',
  'fr_CA',
  'ge',
  'id_ID',
  'it',
  'ja',
  'ko',
  'nb_NO',
  'nep',
  'nl',
  'pl',
  'pt_BR',
  'ru',
  'sk',
  'sv',
  'tr',
  'uk',
  'vi',
  'zh_CN',
  'zh_TW',
];
