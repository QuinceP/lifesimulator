import { Injectable } from '@angular/core';
import { Action } from '../models/action';

@Injectable()

export class ActionService {
  private actions: Action[] = [];

  constructor(){

  }
}
