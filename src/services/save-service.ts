import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Lumberjack } from './lumberjack';
import { Person } from '../models/person';

@Injectable()

export class SaveService {
  constructor(
              public storage: Storage) {
  }

  save(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  load(key: string): Promise<any> {
    return this.storage.get(key);
  }

  /**
   * Clear the entire key value store. WARNING: HOT!
   */
  clear(){
   return this.storage.clear();
  }
}
