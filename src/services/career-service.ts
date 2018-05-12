import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { Helpers } from '../utilities/helpers';
import { Business, Mathematics, Music, Pedagogy, Programming, Science } from './skill-service';
import { Career } from '../models/career';
import { TranslateService } from '../utilities/translate/translate-service';
import { Lumberjack } from './lumberjack';
import { Stat } from '../models/person';
import { SaveService } from './save-service';
import { Skill } from '../models/skill';

export const UNEMPLOYMENT_RATE = 0.04;

@Injectable()
export class CareerService {
  saveKey = 'careers';
  //Careers
  Careers: Career[];
  Unemployed: Career;
  Software: Career;
  Medicine: Career;
  Sales: Career;
  Dishwasher: Career;
  Music: Career;
  Art: Career;
  Education: Career;
  Military: Career;

  //Jobs[]
  UnemployedJobs: Job[];
  SoftwareJobs: Job[];
  MedicineJobs: Job[];
  SalesJobs: Job[];
  DishwasherJobs: Job[];
  MusicJobs: Job[];
  ArtJobs: Job[];
  EducationJobs: Job[];
  MilitaryJobs: Job[];

  constructor(public translateSvc: TranslateService,
              public lumberjack: Lumberjack,
              public saveSvc: SaveService) {
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

    this.MilitaryJobs = [
      (new Job('', 1, 7.25, '', [{ stat: Stat.Strength, statLevel: 10 }])),
      (new Job('', 2, 9, '', [{ stat: Stat.Strength, statLevel: 20 }])),
      (new Job('', 3, 13, '', [{ stat: Stat.Strength, statLevel: 30 }])),
      (new Job('', 4, 30, '', [{ stat: Stat.Strength, statLevel: 40 }])),
      (new Job('', 5, 50, '', [{ stat: Stat.Strength, statLevel: 50 }])),
      (new Job('', 6, 100, '', [{ stat: Stat.Strength, statLevel: 60 }])),
      (new Job('', 7, 200, '', [{ stat: Stat.Strength, statLevel: 70 }])),
      (new Job('', 8, 300, '', [{ stat: Stat.Strength, statLevel: 80 }]))
    ];

    this.EducationJobs = [
      (new Job('', 1, 7.25, '', [{ skill: Pedagogy, level: 10 }])),
      (new Job('', 2, 9, '', [{ skill: Pedagogy, level: 20 }])),
      (new Job('', 3, 13, '', [{ skill: Pedagogy, level: 30 }])),
      (new Job('', 4, 30, '', [{ skill: Pedagogy, level: 40 }])),
      (new Job('', 5, 50, '', [{ skill: Pedagogy, level: 50 }])),
      (new Job('', 6, 100, '', [{ skill: Pedagogy, level: 60 }])),
      (new Job('', 7, 200, '', [{ skill: Pedagogy, level: 70 }])),
      (new Job('', 8, 300, '', [{ skill: Pedagogy, level: 80 }])),
      (new Job('', 9, 400, '', [{ skill: Pedagogy, level: 90 }]))
    ];

    this.MusicJobs = [
      (new Job('', 1, 7.25, '', [])),
      (new Job('', 2, 9, '', [{ skill: Music, level: 9 }, { stat: Stat.Charisma, statLevel: 20 }])),
      (new Job('', 3, 13, '', [{ skill: Music, level: 12 }, { stat: Stat.Charisma, statLevel: 30 }])),
      (new Job('', 4, 30, '', [{ skill: Music, level: 15 }, { stat: Stat.Charisma, statLevel: 40 }])),
      (new Job('', 5, 50, '', [{ skill: Music, level: 30 }, { stat: Stat.Charisma, statLevel: 50 }])),
      (new Job('', 6, 100, '', [{ skill: Music, level: 45 }, { stat: Stat.Charisma, statLevel: 60 }])),
      (new Job('', 7, 200, '', [{ skill: Music, level: 60 }, { stat: Stat.Charisma, statLevel: 70 }])),
      (new Job('', 8, 300, '', [{ skill: Music, level: 75 }, { stat: Stat.Charisma, statLevel: 80 }])),
      (new Job('', 9, 400, '', [{ skill: Music, level: 90 }, { stat: Stat.Charisma, statLevel: 90 }])),
      (new Job('', 10, 600, '', [{ skill: Music, level: 100 }, { stat: Stat.Charisma, statLevel: 100 }]))
    ];

    this.DishwasherJobs = [new Job('', 1, 5.15, '', [])];
    this.ArtJobs = [];

    this.Unemployed = new Career('Unemployed', this.UnemployedJobs);
    this.Software = new Career('Software', this.SoftwareJobs, 'software.png', Helpers.progressColors.primary);
    this.Medicine = new Career('Medicine', this.MedicineJobs, 'medical.png', Helpers.progressColors.danger);
    this.Sales = new Career('Sales', this.SalesJobs, 'business.png', Helpers.progressColors.secondary);
    this.Music = new Career('Music', this.MusicJobs, 'music.png', Helpers.progressColors.primary);
    this.Education = new Career('Education', this.EducationJobs, 'education.png', Helpers.progressColors.warning);
    this.Military = new Career('Military', this.MilitaryJobs, 'military.png', Helpers.progressColors.danger);
    this.Dishwasher = new Career('Dishwasher', this.DishwasherJobs, 'dishwasher.png', Helpers.progressColors.dark);

    this.Careers = [
      this.Software,
      this.Medicine,
      this.Sales,
      this.Music,
      this.Education,
      this.Military,
      this.Dishwasher,
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

  reset() {
    for (let career of this.Careers) {
      career.highestLevel = 0;
      for (let job of career.jobs) {
        job.careerLevel = 0;
      }
    }
  }

  load(): Promise<any> {
    return this.saveSvc.load(this.saveKey).then((val) => {
      if (val) {
        this.lumberjack.info(this.saveKey + ' loaded.');
        let assertedValue: Career[] = val as Career[];
        for (let i = 0; i < assertedValue.length; i++) {
          assertedValue[i] = Object.assign(new Career(), val[i]);
          for (let j in assertedValue[i].jobs) {
            assertedValue[i].jobs[j] = Object.assign(new Job(), assertedValue[i].jobs[j]);
            for (let k in assertedValue[i].jobs[j].requirements) {
              if (assertedValue[i].jobs[j].requirements[k].skill) {
                assertedValue[i].jobs[j].requirements[k].skill = Object.assign(
                  new Skill(), assertedValue[i].jobs[j].requirements[k].skill);

              }
            }
          }
        }

        this.lumberjack.info(assertedValue);
        this.Careers = assertedValue;
      }
      else {
        this.lumberjack.warn(this.saveKey + 'not loaded.');
      }
    }).catch((error) => {
      this.lumberjack.error(error);
    });
  }

  save() {
    let value: Career[] = this.Careers;
    this.saveSvc.save(this.saveKey, value).then((val) => {
      this.lumberjack.info(this.saveKey + ' saved successfully ' + new Date().toUTCString());
    }).catch((error) => {
      this.lumberjack.error('Could not save ' + this.saveKey + '.');
      this.lumberjack.error(error);
    })
  }
}
