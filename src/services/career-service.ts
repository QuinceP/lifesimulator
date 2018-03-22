import { Injectable } from '@angular/core';
import { Career, Software, Unemployed } from '../models/career';

@Injectable()
export class CareerService {
  public Careers: Career[];
  public Unemployed: Career;

  constructor() {
    // this.Careers = [Software, Medical, Business, Art, Education, Music, Military];
    this.Careers = [Software];
    this.Unemployed = Unemployed;

  }
}
