import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Career } from '../../models/career';
import { Helpers } from '../../utilities/helpers';
import { Job, Requirement } from '../../models/job';
import { CareerService } from '../../services/career-service';
import { PlayerService } from '../../services/player-service';
import { TimeService } from '../../services/time-service';
import { SkillService } from '../../services/skill-service';
import { TranslateService } from '../../utilities/translate/translate-service';

@Component({
  selector: 'page-career-detail',
  templateUrl: 'career-detail.html',
})
export class CareerDetailPage {
  private career: Career;
  private Helpers: Helpers;
  private progressColors = Helpers.progressColors;
  private mint: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public careerSvc: CareerService,
              private toastCtrl: ToastController,
              public playerSvc: PlayerService,
              public timeSvc: TimeService,
              public skillSvc: SkillService,
              public translateSvc: TranslateService) {
    this.career = navParams.get('career');
    this.mint = Helpers.hexToRgbA(this.progressColors.primary, 0.4);
  }

  highestLevel() {
    if (this.playerSvc.player.pastCareers.indexOf(this.career) > -1) {
      let i = this.playerSvc.player.pastCareers.indexOf(this.career);
      return this.playerSvc.player.pastCareers[i].highestLevel;
    }
    else {
      return 0;
    }
  }

  requirementsMet(): { requirementsMet: boolean, failedReqs: Requirement[] } {
    let met: boolean = true;
    let failedReqs: Requirement[] = [];
    let requirements: Requirement[];
    if (this.playerSvc.player.pastCareers.indexOf(this.career) > -1) {
      let i = this.playerSvc.player.pastCareers.indexOf(this.career);
      let level = this.playerSvc.player.pastCareers[i].highestLevel;
      requirements = this.career.jobs[level].requirements;
    }
    else {
      requirements = this.career.jobs[0].requirements;
    }

    if (requirements) {
      for (let requirement of requirements) {
        let skillIndex = this.skillSvc.skills.indexOf(requirement.skill);
        if (!(skillIndex > -1 && this.skillSvc.skills[skillIndex].level >= requirement.level)) {
          met = false;
          failedReqs.push(requirement);
        }
      }
    }

    return { requirementsMet: met, failedReqs: failedReqs };
  }

  apply() {
    if (this.highestLevel() < this.career.jobs.length) {
      let job: Job;
      if (this.playerSvc.player.pastCareers.indexOf(this.career) > -1) {
        let i = this.playerSvc.player.pastCareers.indexOf(this.career);
        let level = this.playerSvc.player.pastCareers[i].highestLevel;
        job = this.career.jobs[level];
      }
      else {
        job = this.career.jobs[0];
      }

      let reqResults: { requirementsMet: boolean, failedReqs: Requirement[] } = this.requirementsMet();

      if (reqResults.requirementsMet) {
        this.playerSvc.player.job = job;
        this.playerSvc.player.career = this.career;

        if (this.playerSvc.player.pastCareers.indexOf(this.career) > -1) {
          let i = this.playerSvc.player.pastCareers.indexOf(this.career);
          this.playerSvc.player.pastCareers[i].highestLevel += 1;
        }
        else {
          this.playerSvc.player.pastCareers.push(this.career);
          this.playerSvc.player.pastCareers[this.playerSvc.player.pastCareers.length - 1].highestLevel = 1;
        }

        let toast = this.toastCtrl.create({
          message: 'You got the ' + this.translateSvc.instant(job.title).toTitleCase() + ' job!',
          position: 'top',
          duration: 10000,
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      }
      else {
        let message = 'You didn\'t get the ' + this.translateSvc.instant(job.title).toTitleCase() + ' job. You need:';
        for (let req of reqResults.failedReqs) {
          message += '\n' + req.skill.name + ' level ' + req.level;
        }
        let toast = this.toastCtrl.create({
          message: message,
          position: 'top',
          duration: 10000,
          showCloseButton: true,
          closeButtonText: 'Ok :('
        });
        toast.present();
      }
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'MAX',
        position: 'top',
        duration: 10000,
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    }
  }

  getJobColor(job: Job) {
    try {
      let career: Career = this.careerSvc.Careers.find((element) => {
        return element.title === job.career;
      });
      return Helpers.getColor(Helpers.getPercentage(job.careerLevel, career.jobs.length));
    }
    catch (err) {
      return Helpers.progressColors.light;
    }
  }
}

String.prototype.toTitleCase = function(){
  let smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};
