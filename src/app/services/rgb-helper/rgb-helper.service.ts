import { Injectable } from '@angular/core';
import { RGBColor } from '../../models/colors/rgbColor';

@Injectable({
  providedIn: 'root'
})
export class RgbHelperService {

  constructor() { }

  clip(x:number):number {
    return Math.max(0,Math.min(255, x))
  }
  
  HEXtoRGB(hex: string): RGBColor {
    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
    return { red, green, blue }
  }
  
  
  RGBtoHEX(rgbColor: RGBColor): string {
    const hexR = rgbColor.red.toString(16).padStart(2, '0');
    const hexG = rgbColor.green.toString(16).padStart(2, '0');
    const hexB = rgbColor.blue.toString(16).padStart(2, '0');
  
    return `${hexR}${hexG}${hexB}`;
  }


  isColorDark(rgbcolor: RGBColor): boolean {
    const brightness = this.calculateBrightness(rgbcolor);
    return brightness < 100;
  }
  calculateBrightness(rgbcolor: RGBColor): number {  
    return (rgbcolor.red * 299 + rgbcolor.green * 587 + rgbcolor.blue * 114) / 1000;
  }
}
