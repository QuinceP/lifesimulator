import { Injectable } from '@angular/core';
import { Trello } from 'trello';
import { environment } from '../environments/environment';
import { Lumberjack } from './lumberjack';

let Trello = require("trello");

@Injectable()
export class BugReportService {

  private trello: Trello = new Trello(environment.trello_app_key, environment.trello_user_token);
  private fullVersion: string = environment.version + ' ' + '\"'+ environment.codename +'\"';

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
            let cardId: string = trelloCard['id'];
            this.addLabel(cardId, environment.trello_bug_label);
            this.addVersionLabel().then(label => {
              this.addLabel(cardId, label['id']);
            }).catch(e => this.lumberjack.error(e));
          }
        });
    })
  }

  addLabel(card_id:string, label: string): Promise<any> {
    return new Promise<any>((resolve, reject)=> {
      this.trello.addLabelToCard(card_id, label, (error, result) => {
        if (error || !label) {
          this.lumberjack.error('Could not add card:', error);
          reject();
        }
        else {
          this.lumberjack.info('Added '+ label["name"] + ' label to card', result);
          resolve();
        }
      })
    })
  }

  addVersionLabel(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.trello.getLabelsForBoard(environment.trello_board_id, (error, result) => {
        if (error) {
          this.lumberjack.error('Could not get labels for board:', error);
          reject();
        }
        else {
          if (result['name'] == this.fullVersion){
            resolve(result);
          }
          else {
            this.lumberjack.info('adding label');
            this.trello.addLabelOnBoard(environment.trello_board_id, this.fullVersion, 'purple', (error, result) => {
              if (error) {
                this.lumberjack.error('Could not add version label to board:', error);
                reject();
              }
              else {
                if (result['name'] == this.fullVersion){
                  resolve(result);
                }
                else {
                  reject();
                }
              }
            })
          }
        }
      })
    });
  }

}
