import Color from 'color';
import faker from 'faker';
import { environment } from '../environments/environment';

export class Helpers {

  static hexToRgbA(hex, opacity: number = 1): string {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
    }
    throw new Error('Bad Hex');

  }

  static blendColors(color1: string, color2: string) {
    let backdrop = Color(this.hexToRgbA(color1));
    let source = Color(this.hexToRgbA(color2));
    return backdrop.mix(source).rgb().string();
  }

  static getPercentage(dividend: number, divisor: number) {
    return Math.ceil((dividend / divisor) * 100);
  }

  static progressColors = {
    primary: '#1abc9c',
    secondary: '#3498db',
    danger: '#d35400',
    warning: '#f1c40f',
    light: '#ecf0f1',
    dark: '#95a5a6'
  };

  static weightedRandom(max, numDice) {
    let num = 0;
    for (let i = 0; i < numDice; i++) {
      num += Math.random() * (max / numDice);
    }
    return Math.floor(num);
  };

  static getColor(value: number) {
    let color: string;
    if (value >= 90) {
      color = this.progressColors.primary;
    }
    else if (value >= 80) {
      color = this.blendColors(this.progressColors.primary, this.progressColors.secondary);
    }
    else if (value >= 70) {
      color = this.blendColors(this.progressColors.secondary, this.progressColors.primary);
    }
    else if (value >= 60) {
      color = this.progressColors.secondary;
    }
    else if (value >= 50) {
      color = this.blendColors(this.progressColors.secondary, this.progressColors.warning);
    }
    else if (value >= 40) {
      color = this.blendColors(this.progressColors.warning, this.progressColors.secondary);
    }
    else if (value >= 30) {
      color = this.progressColors.warning;
    }
    else if (value >= 20) {
      color = this.blendColors(this.progressColors.warning, this.progressColors.danger);
    }
    else if (value >= 10) {
      color = this.blendColors(this.progressColors.danger, this.progressColors.warning);
    }
    else {
      color = this.progressColors.danger;
    }
    return color;
  };

  /**
   * Returns a lorem ipsum paragraph.
   * @returns {string}
   */
  static loremIpsum(): string {
    // TODO: Check if debug mode
    return faker.fake("{{lorem.paragraph}}");
  }

  static debugAction(action: ()=> any){
    if (!environment.production){
      action();
    }
  }
}

export const Themes = {
  Dark: "dark-theme",
  Light: "light-theme",
  Default: "default-theme"
};
