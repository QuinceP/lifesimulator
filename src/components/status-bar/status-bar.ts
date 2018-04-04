import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player-service';
import { Helpers } from '../../utilities/helpers';
import { Subscription } from 'rxjs/Subscription';
import { Person } from '../../models/person';

export enum StatusTypes {
  Mood,
  Hunger,
  Health,
  Appearance,
  Intelligence,
  Agility,
  Charisma,
  Dexterity,
  Strength
}

export const Statuses = {
  Mood: ['Depressed', 'Unhappy', 'Content', 'Happy', 'Elated'],
  Hunger: ['Starving', 'Hungry', 'Content', 'Full', 'Stuffed'],
  Health: ['Dying', 'Ill', 'Average', 'Excellent', 'Healthy'],
  Appearance: ['Hideous', 'Ugly', 'Average', 'Attractive', 'Gorgeous'],
  Intelligence: ['Idiot', 'Dumb', 'Average', 'Smart', 'Genius'],
  Agility: ['Sluggish', 'Slow', 'Average', 'Quick', 'Swift'],
  Charisma: ['Socially Inept', 'Awkward', 'Average', 'Charming', 'Magnetic'],
  Dexterity: ['Oafish', 'Clumsy', 'Average', 'Deft', 'Nimble'],
  Strength: ['Feeble', 'Weak', 'Average', 'Strong', 'Powerful']
};

@Component({
  selector: 'status-bar',
  templateUrl: 'status-bar.html'
})
export class StatusComponent implements OnInit, OnDestroy {
  Statuses = Statuses;
  StatusTypes = StatusTypes;
  Helpers = Helpers;
  player: Person;

  constructor(public playerSvc: PlayerService) {
    this.player = playerSvc.player;
  }

  private subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.playerSvc.playerObservable.subscribe(
      (player) => {
        this.player = player;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  static getStatusLevel(value: number): number {
    if (value >= 80) {
      return 4;
    }
    else if (value >= 60) {
      return 3;
    }
    else if (value >= 40) {
      return 2;
    }
    else if (value >= 20) {
      return 1;
    }
    else {
      return 0;
    }
  }

  static getStatus(value: number, statusType: StatusTypes): string {
    let statusLevel = StatusComponent.getStatusLevel(value);

    switch (statusType) {
      case StatusTypes.Mood:
        return Statuses.Mood[statusLevel];

      case StatusTypes.Hunger:
        return Statuses.Hunger[statusLevel];

      case StatusTypes.Health:
        return Statuses.Health[statusLevel];

      case StatusTypes.Appearance:
        return Statuses.Appearance[statusLevel];

      case StatusTypes.Intelligence:
        return Statuses.Intelligence[statusLevel];

      case StatusTypes.Agility:
        return Statuses.Agility[statusLevel];

      case StatusTypes.Charisma:
        return Statuses.Charisma[statusLevel];

      case StatusTypes.Dexterity:
        return Statuses.Dexterity[statusLevel];

      case StatusTypes.Strength:
        return Statuses.Strength[statusLevel];
    }
  }

  getStatus(value: number, statusType: StatusTypes): string {
    return StatusComponent.getStatus(value, statusType);
  }

  getStatusLevel(value: number): number {
    return StatusComponent.getStatusLevel(value);
  }
}
