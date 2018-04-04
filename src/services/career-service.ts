import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Helpers } from '../utilities/helpers';
import { Business, Mathematics, Programming, Science } from './skill-service';
import { Career } from '../models/career';
import { TranslateService } from '../utilities/translate/translate-service';
import { Lumberjack } from './lumberjack';
import { Stat } from '../models/person';

@Injectable()
export class CareerService {
  //Careers
  Careers: Career[];
  Unemployed: Career;
  Software: Career;
  Medicine: Career;
  Sales: Career;

  //Jobs[]
  UnemployedJobs: Job[];
  SoftwareJobs: Job[];
  MedicineJobs: Job[];
  SalesJobs: Job[];

  constructor(public translateSvc: TranslateService,
              public lumberjack: Lumberjack) {
    this.UnemployedJobs = [
      new Job('job-title-unemployed-1', 0, 0, 'Unemployed')
    ];
    this.SoftwareJobs = [
      (new Job('', 1, 20, '', [
        { skill: Programming, level: 1 },
        { skill: Mathematics, level: 1 },
        { stat: Stat.Intelligence, statLevel: 50 }
      ])),
      (new Job('', 2, 40, '', [
        { skill: Programming, level: 3 },
        { skill: Mathematics, level: 2 },
        { stat: Stat.Intelligence, statLevel: 50 }
      ])),
      (new Job('', 3, 60, '', [
        { skill: Programming, level: 10 },
        { skill: Mathematics, level: 4 },
        { stat: Stat.Intelligence, statLevel: 55 }
      ])),
      (new Job('', 4, 80, '', [
        { skill: Programming, level: 15 },
        { skill: Mathematics, level: 6 },
        { stat: Stat.Intelligence, statLevel: 55 }
      ])),
      (new Job('', 5, 100, '', [
        { skill: Programming, level: 20 },
        { skill: Mathematics, level: 8 },
        { stat: Stat.Intelligence, statLevel: 65 }
      ])),
      (new Job('', 6, 120, '', [
        { skill: Programming, level: 25 },
        { skill: Mathematics, level: 10 },
        { stat: Stat.Intelligence, statLevel: 66 }
      ])),
      (new Job('', 7, 140, '', [
        { skill: Programming, level: 35 },
        { skill: Mathematics, level: 10 },
        { stat: Stat.Intelligence, statLevel: 67 }
      ])),
      (new Job('', 8, 160, '', [
        { skill: Programming, level: 89 },
        { skill: Mathematics, level: 10 },
        { stat: Stat.Intelligence, statLevel: 68 }
      ])),
      (new Job('', 9, 180, '', [
        { skill: Programming, level: 100 },
        { skill: Mathematics, level: 10 },
        { stat: Stat.Intelligence, statLevel: 70 }
      ]))
    ];

    this.MedicineJobs = [
      (new Job('', 1, 20, '', [{ skill: Science, level: 5 }, { stat: Stat.Intelligence, statLevel: 50 }])),
      (new Job('', 2, 40, '', [{ skill: Science, level: 14 }, { stat: Stat.Intelligence, statLevel: 55 }])),
      (new Job('', 3, 60, '', [{ skill: Science, level: 23 }, { stat: Stat.Intelligence, statLevel: 65 }])),
      (new Job('', 4, 80, '', [{ skill: Science, level: 35 }, { stat: Stat.Intelligence, statLevel: 70 }])),
      (new Job('', 5, 100, '', [{ skill: Science, level: 42 }, { stat: Stat.Intelligence, statLevel: 75 }])),
      (new Job('', 6, 120, '', [{ skill: Science, level: 50 }, { stat: Stat.Intelligence, statLevel: 80 }])),
      (new Job('', 7, 140, '', [{ skill: Science, level: 61 }, { stat: Stat.Intelligence, statLevel: 85 }])),
      (new Job('', 8, 160, '', [{ skill: Science, level: 71 }, { stat: Stat.Intelligence, statLevel: 90 }])),
      (new Job('', 9, 180, '', [{ skill: Science, level: 82 }, { stat: Stat.Intelligence, statLevel: 95 }])),
      (new Job('', 10, 200, '', [{ skill: Science, level: 93 }, { stat: Stat.Intelligence, statLevel: 98 }])),
      (new Job('', 11, 220, '', [{ skill: Science, level: 100 }, { stat: Stat.Intelligence, statLevel: 100 }])),
    ];

    this.SalesJobs = [
      (new Job('', 1, 7.25, '', [{ skill: Business, level: 1 }, { stat: Stat.Charisma, statLevel: 10 }])),
      (new Job('', 2, 9, '', [{ skill: Business, level: 3 }, { stat: Stat.Charisma, statLevel: 20 }])),
      (new Job('', 3, 13, '', [{ skill: Business, level: 4 }, { stat: Stat.Charisma, statLevel: 30 }])),
      (new Job('', 4, 30, '', [{ skill: Business, level: 5 }, { stat: Stat.Charisma, statLevel: 40 }])),
      (new Job('', 5, 50, '', [{ skill: Business, level: 10 }, { stat: Stat.Charisma, statLevel: 50 }])),
      (new Job('', 6, 100, '', [{ skill: Business, level: 15 }, { stat: Stat.Charisma, statLevel: 60 }])),
      (new Job('', 7, 200, '', [{ skill: Business, level: 20 }, { stat: Stat.Charisma, statLevel: 70 }])),
      (new Job('', 8, 300, '', [{ skill: Business, level: 25 }, { stat: Stat.Charisma, statLevel: 80 }])),
      (new Job('', 9, 400, '', [{ skill: Business, level: 30 }, { stat: Stat.Charisma, statLevel: 90 }])),
      (new Job('', 10, 600, '', [{ skill: Business, level: 35 }, { stat: Stat.Charisma, statLevel: 100 }]))
    ];


    this.Unemployed = new Career('', this.UnemployedJobs);
    this.Software = new Career('Software', this.SoftwareJobs, 'software.png', Helpers.progressColors.primary);
    this.Medicine = new Career('Medicine', this.MedicineJobs, 'medical.png', Helpers.progressColors.danger);
    this.Sales = new Career('Sales', this.SalesJobs, 'business.png', Helpers.progressColors.secondary);

    this.Careers = [
      this.Software,
      this.Medicine,
      this.Sales
    ];
    this.setDescriptionsAndTitles();
  }

  setDescriptionsAndTitles() {
    for (let career of this.Careers) {
      for (let job of career.jobs) {
        job.description = 'job-description-' + career.title.toLowerCase() + '-' + job.careerLevel;
        job.title = 'job-title-' + career.title.toLowerCase() + '-' + job.careerLevel;
        job.career = career.title.toLowerCase();
      }
    }
  }
}


// export const Business: Career = new Career('', undefined, 'business.png', Helpers.progressColors.secondary);
// export const Music: Career = new Career('', undefined, 'music.png', Helpers.progressColors.primary);
// export const Art: Career = new Career('', undefined, 'art.png', Helpers.progressColors.secondary);
// export const Education: Career = new Career('', undefined, 'education.png', Helpers.progressColors.warning);
// export const Military: Career = new Career('', undefined, 'military.png', Helpers.progressColors.danger);

//Helpers.getColor(Helpers.getPercentage(job.careerLevel, job.career.jobs.length))
