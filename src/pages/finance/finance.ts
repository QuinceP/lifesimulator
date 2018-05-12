import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FinanceService } from '../../services/finance-service';
import { PlayerService } from '../../services/player-service';
import { Helpers } from '../../utilities/helpers';
import { TimeService } from '../../services/time-service';
import { Lumberjack } from '../../services/lumberjack';

export enum AccountActions {
  Deposit,
  Withdraw
}

@Component({
  selector: 'page-finance',
  templateUrl: 'finance.html',
})

export class FinancePage {
  private accountActions = AccountActions;
  private selectedAccountAction: number = 1;
  private selectedActionAmount: number = 0;
  private colors = Helpers.progressColors;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public financeSvc: FinanceService,
              public playerSvc: PlayerService,
              public toastCtrl: ToastController,
              public timeSvc: TimeService,
              protected lumberjack: Lumberjack) {
  }

  withdraw() {
    let withdrawalAmount: number = +this.selectedActionAmount;
    if (!isNaN(parseFloat(withdrawalAmount.toString())) && isFinite(withdrawalAmount)) {
      if (this.financeSvc.accountBalance < +this.selectedActionAmount) {
        this.lumberjack.info('insufficient funds')
        withdrawalAmount = this.financeSvc.accountBalance;
        this.playerSvc.player.money += withdrawalAmount;
        this.financeSvc.accountBalance = 0;

      }
      else {
        this.playerSvc.player.money += withdrawalAmount;
        this.financeSvc.accountBalance -= withdrawalAmount;
      }
    }

    this.presentTransactionSuccessToast(AccountActions.Withdraw, withdrawalAmount);
  }

  deposit() {
    let depositAmount: number = +this.selectedActionAmount;
    if (!isNaN(parseFloat(depositAmount.toString())) && isFinite(depositAmount)) {
      if (this.playerSvc.player.money < +this.selectedActionAmount) {
        this.lumberjack.info('insufficient funds');
        depositAmount = this.playerSvc.player.money;
        this.financeSvc.accountBalance += depositAmount;
        this.playerSvc.player.money = 0;

      }
      else {
        this.playerSvc.player.money -= depositAmount;
        this.financeSvc.accountBalance += depositAmount;
      }
    }

    this.presentTransactionSuccessToast(AccountActions.Deposit, depositAmount);
  }

  presentTransactionSuccessToast(action: AccountActions, amount: number){
    let actionString: string = ' ';
    switch (action){
      case AccountActions.Withdraw:
        actionString = 'Withdrew' + actionString;
        break;
      case AccountActions.Deposit:
        actionString = 'Deposited' + actionString;
        break;
    }
    let toastOptions = {
      position: 'top',
      duration: 1500,
      closeButtonText: 'Ok',
      showCloseButton: true,
      message: actionString + amount
    };

    this.toastCtrl.create(toastOptions).present();
  }
}
