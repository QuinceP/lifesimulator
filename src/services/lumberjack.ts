import { Injectable } from '@angular/core';

export abstract class Lumber {

  info: any;
  warn: any;
  error: any;
}

@Injectable()
export class Lumberjack implements Lumber {

  info: any;
  warn: any;
  error: any;

  invokeConsoleMethod(type: string, args?: any): void {
  }
}
