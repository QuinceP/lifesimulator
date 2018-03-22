import { Job } from './job';
import { Helpers } from '../utilities/helpers';
import { Programming } from '../services/skill-service';
const JOB_ICONS_PATH = "assets/icon/jobs/";
export class Career {
  private _title: string;
  private _jobs: Job[];
  private _icon: string;
  private _color: string;
  private _highestLevel: number = 0;

  constructor(title: string, jobs: Job[] = UnemployedJobs, icon: string="unemployed.png", color: string = "#000000") {
    this.jobs = jobs;
    this.title = title;
    this.icon = icon;
    this.color = color;
  }

  get jobs(): Job[] {
    return this._jobs;
  }

  set jobs(value: Job[]) {
    this._jobs = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get icon(): string {
    return JOB_ICONS_PATH + this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get highestLevel(): number {
    return this._highestLevel;
  }

  set highestLevel(value: number) {
    this._highestLevel = value;
  }
}

let SoftwareJobs = [
  (new Job('Intern', 1, 20, 'Software')),
  (new Job('Junior Developer', 2, 40, 'Software', [{skill: Programming, level: 2}])),
  (new Job('Mid Level Developer', 3, 60, 'Software')),
  (new Job('Senior Developer', 4, 80, 'Software')),
  (new Job('Lead Developer', 5, 100, 'Software')),
  (new Job('Software Architect', 6, 120, 'Software')),
  (new Job('Project Manager', 7, 140, 'Software')),
  (new Job('Chief Technology Officer', 8, 160, 'Software')),
  (new Job('Chief Executive Officer', 9, 180, 'Software'))
];

let UnemployedJobs = [new Job('Unemployed', 0, 0, 'Unemployed')];

export const Software: Career = new Career('Software', SoftwareJobs, 'software.png', Helpers.progressColors.primary);
// export const Medical: Career = new Career('Medical', undefined, 'medical.png', Helpers.progressColors.danger);
// export const Business: Career = new Career('Business', undefined, 'business.png', Helpers.progressColors.secondary);
// export const Music: Career = new Career('Music', undefined, 'music.png', Helpers.progressColors.primary);
// export const Art: Career = new Career('Art', undefined, 'art.png', Helpers.progressColors.secondary);
// export const Education: Career = new Career('Education', undefined, 'education.png', Helpers.progressColors.warning);
// export const Military: Career = new Career('Military', undefined, 'military.png', Helpers.progressColors.danger);

export const Unemployed: Career = new Career('None', UnemployedJobs);

//Helpers.getColor(Helpers.getPercentage(job.careerLevel, job.career.jobs.length))
