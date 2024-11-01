import { HSBColor } from "../models/colors/hsbColor";
import { RGBColor } from "../models/colors/rgbColor";

export class Helper {
    static clip(x:number):number {
        return Math.max(0,Math.min(255, x))
    }
      
    static HEXtoRGB(hex: string): RGBColor {
      const bigint = parseInt(hex, 16);
      const red = (bigint >> 16) & 255;
      const green = (bigint >> 8) & 255;
      const blue = bigint & 255;
      return { red, green, blue }
    }      
      
    static RGBtoHEX(rgbColor: RGBColor): string {
      const hexR = rgbColor.red.toString(16).padStart(2, '0');
      const hexG = rgbColor.green.toString(16).padStart(2, '0');
      const hexB = rgbColor.blue.toString(16).padStart(2, '0');
    
      return `${hexR}${hexG}${hexB}`;
    }

    static calculateBrightness(rgbcolor: RGBColor): number {  
        return (rgbcolor.red * 299 + rgbcolor.green * 587 + rgbcolor.blue * 114) / 1000;
    }

    static isColorDark(rgbcolor: RGBColor): boolean {
        const brightness = this.calculateBrightness(rgbcolor);
        return brightness < 100;
    }

    static isColorDarkByHex(hex: string): boolean {
        let rgb = this.HEXtoRGB(hex) 
        const brightness = this.calculateBrightness(rgb);
        return brightness < 100;
    }

    static getTextColorByHex(hex: string) {   
      let rgb = this.HEXtoRGB(hex) 
      let color = this.isColorDark(rgb) ? 'var(--light_text_color)' : 'var(--dark_text_color)'
      return {'color': color}
    }

    static HSBtoRGB(hsbColor: HSBColor): RGBColor{
        let h = hsbColor.hue 
        let s = hsbColor.saturation / 100
        let br = hsbColor.brightness / 100
      
        const c = br * s
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = br - c;
      
        let r, g, b;
        if (0 <= h && h < 60) {
          [r, g, b] = [c, x, 0];
        } else if (60 <= h && h < 120) {
          [r, g, b] = [x, c, 0];
        } else if (120 <= h && h < 180) {
          [r, g, b] = [0, c, x];
        } else if (180 <= h && h < 240) {
          [r, g, b] = [0, x, c];
        } else if (240 <= h && h < 300) {
          [r, g, b] = [x, 0, c];
        } else {
          [r, g, b] = [c, 0, x];
        }
        return  {
          red: Math.round((r + m) * 255),
          green: Math.round((g + m) * 255),
          blue: Math.round((b + m) * 255)
        }
      
    }

    static RGBToHSB(rgbColor: RGBColor): HSBColor {
      let r = rgbColor.red / 255;
      let g = rgbColor.green / 255;
      let b = rgbColor.blue / 255;
    
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
    
      let h = 0, s = 0, br = 0;
      
      if (delta === 0) {
        h = 0;
      } else if (max === r) {
        h = ((g - b) / delta) % 6;
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
    
      h = Math.round((h * 60 + 360) % 360);
    
      s = max === 0 ? 0 : delta / max;
      br = max;
      s *= 100;
      br *= 100;
    
      return { hue:h, saturation:s, brightness:br };
    }
}