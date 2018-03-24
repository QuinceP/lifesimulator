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
  Medicine: Career;

  UnemployedJobs: Job[];
  SoftwareJobs: Job[];
  MedicineJobs: Job[];

  constructor(public translateSvc: TranslateService,
              public lumberjack: Lumberjack) {
    this.UnemployedJobs = [
      new Job('job-title-unemployed-1', 0, 0, 'Unemployed')
    ];
    this.SoftwareJobs = [
      (new Job('', 1, 20, 'Software', [{ skill: Programming, level: 1 }])),
      (new Job('', 2, 40, 'Software', [{ skill: Programming, level: 2 }])),
      (new Job('', 3, 60, 'Software', [{ skill: Programming, level: 3 }])),
      (new Job('', 4, 80, 'Software', [{ skill: Programming, level: 5 }])),
      (new Job('', 5, 100, 'Software', [{ skill: Programming, level: 7 }])),
      (new Job('', 6, 120, 'Software', [{ skill: Programming, level: 15 }])),
      (new Job('', 7, 140, 'Software', [{ skill: Programming, level: 31 }])),
      (new Job('', 8, 160, 'Software', [{ skill: Programming, level: 63 }])),
      (new Job('', 9, 180, 'Software', [{ skill: Programming, level: 64 }]))
    ];

    this.MedicineJobs = [
      (new Job('', 1, 20, 'Software', [{ skill: Programming, level: 1 }])),
      (new Job('', 2, 40, 'Software', [{ skill: Programming, level: 2 }])),
      (new Job('', 3, 60, 'Software', [{ skill: Programming, level: 3 }])),
      (new Job('', 4, 80, 'Software', [{ skill: Programming, level: 5 }])),
      (new Job('', 5, 100, 'Software', [{ skill: Programming, level: 7 }])),
      (new Job('', 6, 120, 'Software', [{ skill: Programming, level: 15 }])),
      (new Job('', 7, 140, 'Software', [{ skill: Programming, level: 31 }])),
      (new Job('', 8, 160, 'Software', [{ skill: Programming, level: 63 }])),
      (new Job('', 9, 180, 'Software', [{ skill: Programming, level: 64 }]))
    ];

    this.Unemployed = new Career('', this.UnemployedJobs);
    this.Software = new Career('Software', this.SoftwareJobs, 'software.png', Helpers.progressColors.primary);
    this.Medicine = new Career('Medicine', this.MedicineJobs, 'medical.png', Helpers.progressColors.danger);

    this.Careers = [this.Software, this.Medicine];
    this.setDescriptionsAndTitles();
  }

  setDescriptionsAndTitles() {
    for (let career of this.Careers){
      for (let job of career.jobs){
        job.description = 'job-description-' + career.title.toLowerCase() + '-' + job.careerLevel;
        job.title = 'job-title-' + career.title.toLowerCase() + '-' + job.careerLevel;
      }
    }
  }
}


// export const Medical: Career = new Career('', undefined, 'medical.png', Helpers.progressColors.danger);
// export const Business: Career = new Career('', undefined, 'business.png', Helpers.progressColors.secondary);
// export const Music: Career = new Career('', undefined, 'music.png', Helpers.progressColors.primary);
// export const Art: Career = new Career('', undefined, 'art.png', Helpers.progressColors.secondary);
// export const Education: Career = new Career('', undefined, 'education.png', Helpers.progressColors.warning);
// export const Military: Career = new Career('', undefined, 'military.png', Helpers.progressColors.danger);

//Helpers.getColor(Helpers.getPercentage(job.careerLevel, job.career.jobs.length))
