import { DoCheck, Injectable, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { Gender, Person, Stat } from '../models/person';
import { countries } from '../models/country';
import CountryLanguage from 'country-language';
import faker from 'faker';
import { Lumberjack } from './lumberjack';
import { AlertController } from 'ionic-angular';
import { CareerService } from './career-service';
import { Subject } from 'rxjs/Subject';
import { HousingService } from './housing-service';
import { StatBook } from '../pages/shopping/shopping';
import { Inventory } from '../models/inventory';
import { SkillService } from './skill-service';
import { FinanceService } from './finance-service';
import { supportedLocales } from '../utilities/translate/translation';
import { Helpers } from '../utilities/helpers';
import { SaveService } from './save-service';
import { Job } from '../models/job';
import { AdService } from './ad-service';
import { Career } from '../models/career';
import { House } from '../models/house';
import { Skill } from '../models/skill';

/**
 * Class to provide player data.
 */
@Injectable()
export class PlayerService {
  saveKey = 'player';
  public player: Person;
  playerSubject = new Subject<Person>();
  playerObservable = this.playerSubject.asObservable();

  /**
   * Births a new player upon initializing.
   * @param {Lumberjack} lumberjack
   * @param {AlertController} alertCtrl
   * @param careerSvc
   * @param housingSvc
   * @param skillSvc
   * @param financeSvc
   * @param saveSvc
   */
  constructor(protected lumberjack: Lumberjack,
              protected alertCtrl: AlertController,
              protected careerSvc: CareerService,
              protected housingSvc: HousingService,
              protected skillSvc: SkillService,
              protected financeSvc: FinanceService,
              protected saveSvc: SaveService,
              protected adSvc: AdService) {

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
    this.player = this.randomPerson();
    this.player.career = this.careerSvc.Unemployed;
    this.player.pastCareers = [];
    this.player.job = this.careerSvc.Unemployed.jobs[0];
    this.player.inventory = new Inventory();
    this.financeSvc.accountBalance = 0;
    this.skillSvc.reset();
    this.showBirthAlert();
    this.playerSubject.next(this.player);
    this.lumberjack.info('New player born 👶🏾');
    this.save();
  }

  load(): Promise<any>{
    return this.saveSvc.load(this.saveKey).then((val)=>{
      if (val){
        this.lumberjack.info(this.saveKey + ' loaded.');
        let player: Person = Object.assign(new Person(), val);
        player.job = Object.assign(new Job(), player.job);
        player.career = Object.assign(new Career(), player.career);
        player.inventory = Object.assign(new Inventory(), player.inventory);
        player.house = Object.assign(new House(), player.house);
        for (let pastCareer in player.pastCareers){
          player.pastCareers[pastCareer] = Object.assign(new Career(), player.pastCareers[pastCareer]);
        }

        this.lumberjack.info(player);
        this.player = player;
        this.playerSubject.next(player)
      }
      else {
        this.lumberjack.warn(this.saveKey + ' not loaded.');
        this.birth();
        this.lumberjack.info('Birth - new save');
      }
    }).catch((error)=> {
      this.lumberjack.error(error);
    });
  }

  save(){
    let value = this.player;
    this.saveSvc.save(this.saveKey,  value).then((val) => {
      this.lumberjack.info(this.saveKey + ' saved successfully ' + new Date().toUTCString());
    }).catch((error) => {
      this.lumberjack.error('Could not save ' + this.saveKey +'.');
      this.lumberjack.error(error);
    })
  }

  randomPerson(): Person {
    let person = new Person();
    let country = PlayerService.randomCountry();
    let fullName = this.generateName(country);
    if (fullName) {
      person.firstName = fullName.firstName;
      person.lastName = fullName.lastName;
    }
    else {
      person.firstName = 'John';
      person.lastName = 'Doe';
    }

    person.career = this.careerSvc.Unemployed;
    person.job = new Job('job-title-unemployed-1', 0, 0, 'Unemployed');
    person.house = this.housingSvc.homeless;
    person.nationality = country.Name;
    person.gender = PlayerService.randomGender();
    person.age = 18;
    person.money = 0;
    person.mood = 85;
    person.hunger = 85;
    person.health = 85;
    person.appearance = Helpers.weightedRandom(100, 2);
    person.intelligence = Helpers.weightedRandom(100, 2);
    person.agility = Helpers.weightedRandom(100, 2);
    person.charisma = Helpers.weightedRandom(100, 2);
    person.dexterity = Helpers.weightedRandom(100, 2);
    person.strength = Helpers.weightedRandom(100, 2);
    return person;
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
    alert.present().then(()=> {this.adSvc.launchInterstitial()});
    alert.onDidDismiss(() => {
      this.birth();
      this.lumberjack.info('Birth after death');
      this.save();
    })
  }

  /**
   * Age the player
   */
  birthday() {
    this.player.age += 1;
    let alert = this.alertCtrl.create({
      message: 'It\'s your birthday! You are now ' + this.player.age + '.',
      buttons: [{
        text: 'Yay!',
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
   * Generates a random name given a CountryIdentifier.
   * @param {CountryIdentifier} countryIdentifier
   */
  generateName(countryIdentifier: CountryIdentifier): FullName | void {
    return CountryLanguage.getCountry(countryIdentifier.Code, (err, country: { languages: string[] }) => {
      if (err) {
        this.lumberjack.info(err);
        return { firstName: 'John', lastName: 'Doe' };
      }
      else {
        let languageStrings: string[] = PlayerService.languageStrings(country);
        if (typeof languageStrings == 'undefined' || languageStrings.length < 1) {
          languageStrings = ['en'];
        }
        let names = PlayerService.names(languageStrings);
        return names[Math.floor(Math.random() * names.length)];
      }
    });
  }

  /**
   * Flips a coin to return a gender.
   * @returns {Gender}
   */
  static randomGender(): Gender {
    let coinFlip = Math.floor(Math.random() * Math.floor(2));
    return coinFlip ? Gender.Female : Gender.Male;
  }

  readBook(book: StatBook, isInventoryBook: boolean = true, type: string = "book") {
    let prev: number = 0;
    let now: number = 0;

    switch (book.stat) {
      case Stat.Appearance:
        prev = this.player.appearance;
        this.player.appearance += book.increase;
        now = this.player.appearance;
        break;
      case Stat.Intelligence:
        prev = this.player.intelligence;
        this.player.intelligence += book.increase;
        now = this.player.intelligence;
        break;
      case Stat.Strength:
        prev = this.player.strength;
        this.player.strength += book.increase;
        now = this.player.strength;
        break;
      case Stat.Agility:
        prev = this.player.agility;
        this.player.agility += book.increase;
        now = this.player.agility;
        break;
      case Stat.Dexterity:
        prev = this.player.dexterity;
        this.player.dexterity += book.increase;
        now = this.player.dexterity;
        break;
      case Stat.Charisma:
        prev = this.player.charisma;
        this.player.charisma += book.increase;
        now = this.player.charisma;
    }
    if (isInventoryBook) {
      this.removeBookFromInventory(book);
    }

    let message: string = '';
    switch (type) {
      case "book":
        message = 'You read "' + book.title + '". Your '
          + book.stat + ' has increased by ' + book.increase + '. (' + prev.toString() + '->' + now + ')';
        break;
      case Stat.Strength:
        message = 'You lifted weights. Your '
          + book.stat + ' has increased by ' + book.increase + '. (' + prev.toString() + '->' + now + ')';
        break;
      case Stat.Agility:
        message = 'You went for a run. Your '
          + book.stat + ' has increased by ' + book.increase + '. (' + prev.toString() + '->' + now + ')';
        break;
      case Stat.Dexterity:
        message = 'You did gymnastics. Your '
          + book.stat + ' has increased by ' + book.increase + '. (' + prev.toString() + '->' + now + ')';
        break;
    }

    let alert = this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'Ok',
        cssClass: 'game-alert'
      }],
    }).present();
  }

  addBookToInventory(book: StatBook) {
    this.player.inventory.items.books.push(book);
  }

  removeBookFromInventory(book: StatBook) {
    try {
      let index = this.player.inventory.items.books.indexOf(book);
      if (index > -1) {
        this.player.inventory.items.books.splice(index, 1);
      }
      else {
        throw Error('Could not remove book from inventory.');
      }
    }
    catch (err) {
      this.lumberjack.error(err);
    }
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


