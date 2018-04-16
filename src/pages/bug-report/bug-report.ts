import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { BugReportService } from '../../services/bug-report-service';
import { Lumberjack } from '../../services/lumberjack';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-bug-report',
  templateUrl: 'bug-report.html',
})
export class BugReportPage {
  summary: string = '';
  description: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private bugReportSvc: BugReportService,
              public alertCtrl: AlertController,
              public lumberjack: Lumberjack) {
  }

  submit() {
    this.bugReportSvc.submitBug(this.summary, this.description).then(() => {
      this.showReportSuccessAlert(true);
    }).catch((error) => {
      this.showReportSuccessAlert(false);
      this.lumberjack.error(error);
    })
  }

  showReportSuccessAlert(success: boolean) {
    this.summary = '';
    this.description = '';
    let alert = this.alertCtrl.create({
      title: success ? 'Success!' : 'Error',
      message: success ? 'Your bug report was sent successfully.' : 'There was an error sending your bug report. Please try again.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
    alert.onDidDismiss(() => {
      this.navCtrl.push(MenuPage);
    })
  }
}
