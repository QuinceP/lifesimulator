import { Injectable } from '@angular/core';
import { Trello } from 'trello';
import { environment } from '../environments/environment';
import { Lumberjack } from './lumberjack';

let Trello = require("trello");

@Injectable()
export class BugReportService {

  private trello: Trello = new Trello(environment.trello_app_key, environment.trello_user_token);

  constructor(public lumberjack: Lumberjack) {
  }

  submitBug(summary: string, description: string): Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      this.trello.addCard(
        summary,
        description,
        environment.trello_bug_list_id,
        (error, trelloCard) => {
          if (error) {
            this.lumberjack.error('Could not add card:', error);
            reject(error);
          }
          else {
            this.lumberjack.info('Added card:', trelloCard);
            resolve();
            this.addBugLabel(trelloCard['id']);
          }
        });
    })
  }

  addBugLabel(card_id): Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      this.trello.addLabelToCard(card_id, environment.trello_bug_label, (error, result) => {
        if (error) {
          this.lumberjack.error('Could not add card:', error);
          reject();
        }
        else {
          this.lumberjack.info('Added bug label to card', result);
          resolve();
        }
      })
    })
  }
}
