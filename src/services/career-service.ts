import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Helpers } from '../utilities/helpers';
import { Programming } from './skill-service';
import { Career } from '../models/career';
import { TranslateService } from '../utilities/translate/translate-service';
import { Lumberjack } from './lumberjack';

@Injectable()
export class CareerService {
  Careers: Career[];
  Unemployed: Career;
  Software: Career;
  UnemployedJobs: Job[];
  SoftwareJobs: Job[];


  constructor(public translateSvc: TranslateService,
              public lumberjack: Lumberjack) {
    this.UnemployedJobs = [
      new Job('Unemployed', 0, 0, 'Unemployed')
    ];
    this.SoftwareJobs = [
      (new Job('Intern', 1, 20, 'Software', [{ skill: Programming, level: 1 }])),
      (new Job('Junior Developer', 2, 40, 'Software', [{ skill: Programming, level: 2 }])),
      (new Job('Mid Level Developer', 3, 60, 'Software', [{ skill: Programming, level: 3 }])),
      (new Job('Senior Developer', 4, 80, 'Software', [{ skill: Programming, level: 5 }])),
      (new Job('Lead Developer', 5, 100, 'Software', [{ skill: Programming, level: 7 }])),
      (new Job('Software Architect', 6, 120, 'Software', [{ skill: Programming, level: 15 }])),
      (new Job('Project Manager', 7, 140, 'Software', [{ skill: Programming, level: 31 }])),
      (new Job('Chief Technology Officer', 8, 160, 'Software', [{ skill: Programming, level: 63 }])),
      (new Job('Chief Executive Officer', 9, 180, 'Software', [{ skill: Programming, level: 64 }]))
    ];

    this.Unemployed = new Career('None', this.UnemployedJobs);
    this.Software = new Career('Software', this.SoftwareJobs, 'software.png', Helpers.progressColors.primary);
    this.setDescriptions(this.Software);

    // this.Careers = [Software, Medical, Business, Art, Education, Music, Military];
    this.Careers = [this.Software];
  }

  setDescriptions(career: Career) {
    for (let job of career.jobs){
      let descriptionSelector = 'job-description-' + career.title.toLowerCase() + '-' + job.careerLevel;
      job.description = this.translateSvc.instant(descriptionSelector);
    }
  }
}


// export const Medical: Career = new Career('Medical', undefined, 'medical.png', Helpers.progressColors.danger);
// export const Business: Career = new Career('Business', undefined, 'business.png', Helpers.progressColors.secondary);
// export const Music: Career = new Career('Music', undefined, 'music.png', Helpers.progressColors.primary);
// export const Art: Career = new Career('Art', undefined, 'art.png', Helpers.progressColors.secondary);
// export const Education: Career = new Career('Education', undefined, 'education.png', Helpers.progressColors.warning);
// export const Military: Career = new Career('Military', undefined, 'military.png', Helpers.progressColors.danger);

//Helpers.getColor(Helpers.getPercentage(job.careerLevel, job.career.jobs.length))
