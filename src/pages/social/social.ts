import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TimeService } from '../../services/time-service';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';
import { Person } from '../../models/person';
import { PlayerService } from '../../services/player-service';
import { StatusComponent, StatusTypes } from '../../components/status-bar/status-bar';
import { CareerService } from '../../services/career-service';
import { TranslateService } from '../../utilities/translate/translate-service';
import { Helpers } from '../../utilities/helpers';

interface RecentCard {
  text: string;
  color: string;
}

@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<Person>;
  stackConfig: StackConfig;
  recentCard: RecentCard = {text: '', color: ''};
  statusTypes = StatusTypes;

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [this.playerSvc.randomPerson()];
    this.addNewCards(1);
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public timeSvc: TimeService,
              public playerSvc: PlayerService,
              public careerSvc: CareerService,
              public translateSvc: TranslateService) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    // element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();

    this.addNewCards(1);
    if (like) {
      this.recentCard = { text: 'You liked: ' +removedCard.firstName, color: Helpers.progressColors.primary};
    } else
      {
        this.recentCard = {text: 'You disliked: ' + removedCard.firstName, color: Helpers.progressColors.danger};
      }
    }

// Add new cards to our array
    addNewCards(count
  :
    number
  )
    {
      let person = this.playerSvc.randomPerson();
      let minAge = (this.playerSvc.player.age / 2) + 7;
      minAge = minAge < 18 ? 18 : minAge;
      person.age = this.getRandomInt(minAge, (this.playerSvc.player.age * 2) - 7);
      let careerIndex: number = this.getRandomInt(0, this.careerSvc.Careers.length - 1);
      let unemployedRoll = Math.random();
      if (unemployedRoll < 0.04) {
        person.career = this.careerSvc.Unemployed;
        person.job = this.careerSvc.Unemployed.jobs[0]
      } else {
        let career = this.careerSvc.Careers[careerIndex];
        person.career = career;
        let jobIndex: number = this.getRandomInt(0, career.jobs.length - 1);
        person.job = career.jobs[jobIndex];
      }

      this.cards.push(person);
    }

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
    decimalToHex(d, padding)
    {
      var hex = Number(d).toString(16);
      padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

      while (hex.length < padding) {
        hex = "0" + hex;
      }

      return hex;
    }

    getStatus(value
  :
    number, type
  :
    StatusTypes
  )
    {
      return StatusComponent.getStatus(value, type);
    }

    getRandomInt(min, max)
    {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
  }
