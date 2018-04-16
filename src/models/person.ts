import { Job } from './job';
import { Career } from './career';
import { House } from './house';
import { Inventory } from './inventory';
import { CountryIdentifier, FullName, PlayerService } from '../services/player-service';
import { Helpers } from '../utilities/helpers';
import CountryLanguage from 'country-language';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

export enum Gender {
  Female = "female",
  Male = "male"
}

export enum Stat {
  Appearance = "Appearance",
  Intelligence = "Intelligence",
  Strength = "Strength",
  Agility = "Agility",
  Dexterity = "Dexterity",
  Charisma = "Charisma"
}

export class Person {
  private _firstName: string = '';
  private _lastName: string = '';
  private _age: number = 0;
  private _mood: number = 1;
  private _hunger: number = 1;
  private _health: number = 1;
  private _appearance: number = 1;
  private _intelligence: number = 1;
  private _strength: number = 1;
  private _agility: number = 1;
  private _dexterity: number = 1;
  private _charisma: number = 1;
  private _nationality: string = '';
  private _ethnicity: string = '';
  private _money: number = 0;
  private _job: Job = new Job();
  private _career: Career = new Career();
  private _ascensions: number = 0;
  private _house: House = new House();
  private _pastCareers: Career[] = [];
  private _gender: Gender = Gender.Female;
  private _inventory: Inventory = new Inventory();

  constructor() {

  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;

  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {

    this._lastName = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {

    this._age = value;
  }

  get mood(): number {
    return this._mood;
  }

  set mood(value: number) {
    if (value >= 100) {
      this._mood = 100;
    }
    else if (value <= 0) {
      this._mood = 0;
    }
    else {
      this._mood = value;
    }


  }

  get appearance(): number {
    return this._appearance;
  }

  set appearance(value: number) {
    this._appearance = (value >= 100 ? 100 : value);

  }

  get intelligence(): number {
    return this._intelligence;
  }

  set intelligence(value: number) {
    this._intelligence = (value >= 100 ? 100 : value);

  }

  get strength(): number {
    return this._strength;
  }

  set strength(value: number) {
    this._strength = (value >= 100 ? 100 : value);

  }

  get agility(): number {
    return this._agility;
  }

  set agility(value: number) {
    this._agility = (value >= 100 ? 100 : value);

  }

  get dexterity(): number {
    return this._dexterity;
  }

  set dexterity(value: number) {
    this._dexterity = (value >= 100 ? 100 : value);

  }

  get charisma(): number {
    return this._charisma;
  }

  set charisma(value: number) {
    this._charisma = (value >= 100 ? 100 : value);

  }

  get money(): number {
    return this._money;
  }

  set money(value: number) {
    this._money = value;

  }

  get job(): Job {
    return this._job;
  }

  set job(value: Job) {
    this._job = value;

  }

  get nationality(): string {
    return this._nationality;
  }

  set nationality(value: string) {
    this._nationality = value;

  }

  get ethnicity(): string {
    return this._ethnicity;
  }

  set ethnicity(value: string) {
    this._ethnicity = value;

  }

  get career(): Career {
    return this._career;
  }

  set career(value: Career) {

    this._career = value;
  }

  get ascensions(): number {
    return this._ascensions;
  }

  set ascensions(value: number) {

    this._ascensions = value;
  }

  get hunger(): number {
    return this._hunger;
  }

  set hunger(value: number) {
    if (value >= 100) {
      this._hunger = 100;
    }
    else if (value <= 0) {
      this._hunger = 0;
    }
    else {
      this._hunger = value;
    }

  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    if (value >= 100) {
      this._health = 100;
    }
    else if (value <= 0) {
      this._health = 0;
    }
    else {
      this._health = value;
    }

  }

  get house(): House {
    return this._house;
  }

  set house(value: House) {
    this._house = value;

  }

  get pastCareers(): Career[] {
    return this._pastCareers;
  }

  set pastCareers(value: Career[]) {
    this._pastCareers = value;

  }

  get gender(): Gender {
    return this._gender;
  }

  set gender(value: Gender) {
    this._gender = value;

  }

  get inventory(): Inventory {
    return this._inventory;
  }

  set inventory(value: Inventory) {
    this._inventory = value;

  }
}
