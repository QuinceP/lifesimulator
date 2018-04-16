import { Job } from './job';

const JOB_ICONS_PATH = "assets/icon/jobs/";

export class Career {
  private _title: string;
  private _jobs: Job[];
  private _icon: string;
  private _color: string;
  private _highestLevel: number = 0;

  constructor(title: string = '', jobs: Job[] = [], icon: string = "unemployed.png", color: string = "#000000") {
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
