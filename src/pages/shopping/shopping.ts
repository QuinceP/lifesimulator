import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stat } from '../../models/person';
import { Helpers } from '../../utilities/helpers';
import { PlayerService } from '../../services/player-service';
import { TimeService } from '../../services/time-service';

export enum Stores {
  Bookstore = "Bookstore",
  Gym = "Gym"
}

export interface StatBook {
  title: string;
  stat: Stat;
  increase: number;
  price: number;
}

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  Stores = Stores;
  store: string = Stores.Bookstore;
  Stat = Stat;

  bookstoreBooks: StatBook[] = [
    { title: 'How To Be Everyone\'s Friend, Vol. 1', stat: this.Stat.Charisma, increase: 1, price: 500 },
    { title: 'How To Be Everyone\'s Friend Vol. 2', stat: this.Stat.Charisma, increase: 5, price: 2000 },
    { title: 'How To Be Everyone\'s Friend Vol. 3', stat: this.Stat.Charisma, increase: 15, price: 5500 },

    { title: 'Philosophy, Vol. 1', stat: this.Stat.Intelligence, increase: 1, price: 500 },
    { title: 'Philosophy, Vol. 2', stat: this.Stat.Intelligence, increase: 5, price: 2000 },
    { title: 'Philosophy, Vol. 3', stat: this.Stat.Intelligence, increase: 15, price: 5500 },
  ];

  gymActivities: StatBook[] = [
    { title: 'lift dumbbells', stat: this.Stat.Strength, increase: 1, price: 500 },
    { title: 'bench press', stat: this.Stat.Strength, increase: 2, price: 2000 },
    { title: 'do squats', stat: this.Stat.Strength, increase: 3, price: 5500 },

    { title: 'go for a jog', stat: this.Stat.Agility, increase: 1, price: 500 },
    { title: 'do sprints', stat: this.Stat.Agility, increase: 2, price: 2000 },
    { title: 'run a marathon', stat: this.Stat.Agility, increase: 3, price: 5500 },

    { title: 'do tumbling', stat: this.Stat.Dexterity, increase: 1, price: 500 },
    { title: 'use the pommel horse', stat: this.Stat.Dexterity, increase: 2, price: 2000 },
    { title: 'do vaults', stat: this.Stat.Dexterity, increase: 3, price: 5500 },
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public playerSvc: PlayerService,
              public alertCtrl: AlertController,
              public timeSvc: TimeService) {
  }

  buyBook(book: StatBook, quantity: number = 1) {
    if (this.playerSvc.player.money >= book.price * quantity) {
      this.presentBookBuyConfirmation(book, quantity);
    }
    else {
      this.showInsufficientFundsAlert();
    }
  }

  doGymActivity(book: StatBook){
    if (this.playerSvc.player.money >= book.price) {
      this.presentGymActivityConfirmation(book);
    }
    else {
      this.showInsufficientFundsAlert();
    }
  }

  presentGymActivityConfirmation(book: StatBook){
    let alert = this.alertCtrl.create({
      title: 'Buy',
      message: 'Are you sure you want to ' + book.title + ' for $' + book.price + '?',
      buttons: [
        {
          text: 'Buy',
          handler: () => {
            this.handleTransaction(book, 1, false);
            this.playerSvc.readBook(book, false, book.stat);
            //TODO: Fix ugly black screen animation
            // let alert = this.alertCtrl.create({
            //   message: 'You ' + book.title + '" for $' + book.price + '.',
            //   buttons: [{
            //     text: 'Ok',
            //     cssClass: 'game-alert'
            //   }],
            // });
            // alert.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  //TODO: Use locale currency symbols
  presentBookBuyConfirmation(book: StatBook, quantity: number) {
    let total: number = book.price * quantity;
    let alert = this.alertCtrl.create({
      title: 'Buy',
      message: 'Are you sure you want to buy ' + quantity + ' "' + book.title + '" for $' + total + '?',
      buttons: [
        {
          text: 'Buy',
          handler: () => {
            this.handleTransaction(book, quantity);
            //TODO: Fix ugly black screen animation
            this.showSuccessfulTransactionAlert(book, quantity);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  handleTransaction(book: StatBook, quantity: number, putInInventory: boolean = true) {
    if (putInInventory){
      for (let i = 0; i < quantity; i++) {
        this.playerSvc.player.inventory.items.books.push(book);
      }
    }
    this.playerSvc.player.money -= book.price * quantity;
  }

  showInsufficientFundsAlert() {
    let alert = this.alertCtrl.create({
      message: 'You don\'t have enough money.',
      buttons: [{
        text: 'Ok',
        cssClass: 'game-alert'
      }],
    });
    alert.present();
  }

  showSuccessfulTransactionAlert(book: StatBook, quantity: number) {
    let total: number = book.price * quantity;
    let alert = this.alertCtrl.create({
      message: 'You bought ' + quantity + ' "' + book.title + '" for $' + total + '.',
      buttons: [{
        text: 'Ok',
        cssClass: 'game-alert'
      }],
    });
    alert.present();
  }

  getStatIcon(stat: string) {
    let icon: string = '';
    switch (stat) {
      case Stat.Appearance:
        icon = 'thermometer';
        break;
      case Stat.Intelligence:
        icon = 'book';
        break;
      case Stat.Strength:
        icon = 'american-football';
        break;
      case Stat.Agility:
        icon = 'walk';
        break;
      case Stat.Dexterity:
        icon = 'bicycle';
        break;
      case Stat.Charisma:
        icon = 'call';
    }
    return icon;
  }

  getStatColor(stat: string) {
    let color: string = '';
    switch (stat) {
      case Stat.Appearance:
        color = Helpers.progressColors.danger;
        break;
      case Stat.Intelligence:
        color = Helpers.progressColors.primary;
        break;
      case Stat.Strength:
        color = Helpers.progressColors.secondary;
        break;
      case Stat.Agility:
        color = Helpers.progressColors.warning;
        break;
      case Stat.Dexterity:
        color = Helpers.progressColors.danger;
        break;
      case Stat.Charisma:
        color = Helpers.progressColors.warning;
    }
    return color;
  }

}
